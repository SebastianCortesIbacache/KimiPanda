#!/usr/bin/env python3
"""
Kimi Panda — Asset Budget Auditor
Audita los presupuestos de peso de assets estáticos para garantizar
una experiencia fluida en tablets escolares (Android 2GB RAM / PWA Offline).
"""

import os
import sys

# Compatibilidad con consolas Windows (evitar errores de codificación cp1252)
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

# Presupuestos máximos en Kilobytes (KB)
BUDGETS = {
    "preguntas": 120,      # Ilustraciones didácticas WebP
    "mascotas": 260,       # Renders 3D hero WebP
    "interface": 60,       # Iconos y badges SVG/WebP
    "sounds": 150,         # Efectos de sonido SFX
    "general": 300         # Otros assets estáticos
}

def get_budget_category(rel_path):
    lower = rel_path.lower().replace("\\", "/")
    if "preguntas" in lower:
        return "preguntas"
    if "mascotas" in lower:
        return "mascotas"
    if "interface" in lower or "icon" in lower:
        return "interface"
    if "sound" in lower or "audio" in lower:
        return "sounds"
    return "general"

def check_budgets(assets_dir):
    if not os.path.exists(assets_dir):
        print(f"[!] Directorio no encontrado: {assets_dir}")
        return True

    violations = []
    total_assets = 0
    total_bytes = 0

    for root, _, files in os.walk(assets_dir):
        for f in files:
            # Ignorar git o archivos ocultos
            if f.startswith("."):
                continue

            file_path = os.path.join(root, f)
            rel_path = os.path.relpath(file_path, assets_dir)
            size_bytes = os.path.getsize(file_path)
            size_kb = size_bytes / 1024.0

            total_assets += 1
            total_bytes += size_bytes

            category = get_budget_category(rel_path)
            max_kb = BUDGETS[category]

            if size_kb > max_kb:
                violations.append((rel_path, category, size_kb, max_kb))

    print(f"\n[ASSET BUDGET AUDIT] Directorio: {assets_dir}")
    print(f"   Total de assets evaluados: {total_assets}")
    print(f"   Peso total del bundle de assets: {total_bytes / (1024 * 1024):.2f} MB")

    if violations:
        print(f"\n[!] ATENCION: {len(violations)} assets superan el presupuesto:")
        for rel_path, cat, actual, limit in violations:
            print(f"   - {rel_path} [{cat}]: {actual:.1f} KB (Limite: {limit} KB)")
        return False
    else:
        print("\n[OK] Todos los assets cumplen con el presupuesto PWA (< 120KB preguntas, < 260KB mascotas).")
        return True

if __name__ == "__main__":
    target = "assets"
    if len(sys.argv) > 1:
        target = sys.argv[1]
    
    # Determinar si estamos dentro de un subdirectorio o en raíz
    if not os.path.exists(target) and os.path.exists(os.path.join("..", target)):
        target = os.path.join("..", target)

    success = check_budgets(target)
    sys.exit(0 if success else 1)
