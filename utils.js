// manejo de funciones auxiliares (CSV, fechas, filtros)
(function (window) {

  /**
   * Formatea una fecha ISO a formato local legible.
   */
  function formatDateTime(iso) {
    const d = new Date(iso);
    return d.toLocaleString();
  }

  /**
   * Filtra registros por rango de fechas.
   */
  function filterByDateRange(items, from, to) {
    if (!from && !to) return items;

    const f = from ? new Date(from).setHours(0, 0, 0, 0) : null;
    const t = to ? new Date(to).setHours(23, 59, 59, 999) : null;

    return items.filter(it => {
      const ts = new Date(it.ts).getTime();
      if (f && ts < f) return false;
      if (t && ts > t) return false;
      return true;
    });
  }

  /**
   * Exporta un arreglo de objetos a un archivo CSV descargable.
   */
  function exportToCSV(filename, rows) {
    if (!rows || !rows.length) return;

    const keys = Object.keys(rows[0]);
    const csv = [
      keys.join(','),  
      ...rows.map(r =>
        keys.map(k => `"${String(r[k]).replace(/"/g, '""')}"`).join(',')
      )
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Notificación visual breve y no intrusiva (toast).
   */
  function toast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const div = document.createElement('div');
    div.className = `toast toast-${type}`;
    div.textContent = message;

    container.appendChild(div);

    setTimeout(() => {
      div.remove();
    }, 3000);
  }

  // Exponer funciones utilitarias globalmente
  window.Utils = {
    formatDateTime,
    filterByDateRange,
    exportToCSV,
    toast
  };

})(window);
