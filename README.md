# Laboratório RLC — standalone local app

Run `python3 -m http.server 8000` in this directory and open http://localhost:8000. You can also open `index.html` directly. No installation, internet connection, CDN, backend, or Streamlit runtime is required.

## Contents
- `index.html`, `style.css`, `app.js`: Portuguese controls, six views, plots, comparisons and exports.
- `solver.js`: analytic RLC solution in SI units, including critical damping, lossless circuits and lossless resonance.
- `assets/circuit.svg`: local circuit artwork extracted/reconstructed from the hosted SVG's geometry, with editor metadata removed. Uses system fonts.
- `test.js`: numerical verification; run `node test.js`.

## Provenance and limitations
Recreated from the publicly rendered application at https://laboratorio-rlc-4tr4fpjq5j53mqdgjgidjn.streamlit.app/ . The original server-side source was not publicly accessible; these are newly implemented standalone sources, not downloaded original Python code. The hosted product's circuit illustration and author attribution are retained. Original notice: Todos os direitos reservados. Prof. Dr. Silvio Giuseppe Di Santo, GEMSP, Escola Politécnica da USP. No ownership or redistribution permission is implied.

Plots use local Canvas/SVG instead of Plotly; legend toggles and hover values work, but the original Plotly toolbar is not replicated. HTML export is a standalone interactive current plot; CSV includes total/natural/forced states, voltages and energy. Scenarios are held in memory for the page session, up to five. Streamlit shell, menus, deployment controls, telemetry and runtime assets are intentionally excluded.

## Validation
- `node --check app.js`: passed.
- `node test.js`: 514 checks passed for initial conditions, both circuit differential equations, decomposition and energy balance across undamped, underdamped, critical and overdamped regimes, resonance and different phases.
- Chrome local test: all six views rendered, circuit image loaded, local-only resource URLs, comparisons and parameter changes exercised.
