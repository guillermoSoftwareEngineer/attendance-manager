// persistencia y bases de datos del local storage
(function (window) {

  const KEY = 'attendance_db_v1';

  /**
   * Carga la base de datos desde LocalStorage.
   * Retorna estructura inicial si no existe.
   */
  function load() {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : { employees: [], attendance: [] };
  }

  /**
   * Guarda la base de datos en LocalStorage.
   */
  function save(db) {
    localStorage.setItem(KEY, JSON.stringify(db));
  }

  /**
   * Elimina completamente la base de datos.
   */
  function clear() {
    localStorage.removeItem(KEY);
  }

  /**
   * Carga datos de ejemplo (seed) para pruebas.
   */
  function seedExample() {
    const db = {
      employees: [
        { id: '1001', name: 'Ana Pérez' },
        { id: '1002', name: 'Carlos Gómez' }
      ],
      attendance: [
        {
          id: createId(),
          empId: '1001',
          name: 'Ana Pérez',
          type: 'entry',
          ts: new Date().toISOString()
        },
        {
          id: createId(),
          empId: '1002',
          name: 'Carlos Gómez',
          type: 'entry',
          ts: new Date().toISOString()
        }
      ]
    };

    save(db);
    return db;
  }

  /**
   * Genera ID simple y único para registros.
   */
  function createId() {
    return 'a' + Math.random().toString(36).slice(2, 9);
  }

  // Exponer API global
  window.DB = {
    KEY,
    load,
    save,
    clear,
    seedExample,
    createId
  };

})(window);
