// logica principal renderizado manejo del DOM etc
(function () {

  // Elementos DOM
  const empForm = document.getElementById('employeeForm');
  const empName = document.getElementById('empName');
  const empId = document.getElementById('empId');
  const selectEmployee = document.getElementById('selectEmployee');
  const markEntry = document.getElementById('markEntry');
  const markExit = document.getElementById('markExit');
  const attendanceTableBody = document.querySelector('#attendanceTable tbody');
  const searchInput = document.getElementById('searchInput');
  const dateFrom = document.getElementById('dateFrom');
  const dateTo = document.getElementById('dateTo');
  const btnFilter = document.getElementById('btnFilter');
  const btnClearFilter = document.getElementById('btnClearFilter');
  const btnExport = document.getElementById('btnExport');
  const btnSeed = document.getElementById('btnSeed');

  // Estado en memoria
  let db = DB.load();

  // Inicializar UI
  function init() {
    refreshEmployeeSelect();
    renderAttendance(db.attendance);
    attachEvents();
  }

  // Eventos
  function attachEvents() {

    empForm.addEventListener('submit', e => {
      e.preventDefault();
      addEmployee(empId.value.trim(), empName.value.trim());
      empForm.reset();
    });

    markEntry.addEventListener('click', () => handleMark('entry'));
    markExit.addEventListener('click', () => handleMark('exit'));

    btnFilter.addEventListener('click', () => applyFilters());

    btnClearFilter.addEventListener('click', () => {
      searchInput.value = '';
      dateFrom.value = '';
      dateTo.value = '';
      renderAttendance(db.attendance);
      Utils.toast('Filtros limpiados', 'info');
    });

    btnExport.addEventListener('click', () => {
      const rows = db.attendance.map(r => ({
        fecha: r.ts,
        id: r.empId,
        nombre: r.name,
        tipo: r.type
      }));
      Utils.exportToCSV('asistencias.csv', rows);
      Utils.toast('CSV exportado correctamente', 'success');
    });

    btnSeed.addEventListener('click', () => {
      db = DB.seedExample();
      DB.save(db);
      refreshEmployeeSelect();
      renderAttendance(db.attendance);
      Utils.toast('Datos de ejemplo cargados', 'info');
    });
  }

  // Añadir empleado
  function addEmployee(id, name) {
    if (!id || !name) {
      Utils.toast('Ingrese ID y nombre', 'error');
      return;
    }

    if (db.employees.some(e => e.id === id)) {
      Utils.toast('Ya existe un empleado con ese ID', 'error');
      return;
    }

    db.employees.push({ id, name });
    DB.save(db);
    refreshEmployeeSelect();

    Utils.toast('Empleado agregado exitosamente', 'success');
  }

  // Marcar asistencia (entrada/salida)
  function handleMark(type) {
    const empId = selectEmployee.value;

    if (!empId) {
      Utils.toast('Seleccione un empleado', 'error');
      return;
    }

    const emp = db.employees.find(e => e.id === empId);
    if (!emp) {
      Utils.toast('Empleado no encontrado', 'error');
      return;
    }

    const record = {
      id: DB.createId(),
      empId: emp.id,
      name: emp.name,
      type,
      ts: new Date().toISOString()
    };

    db.attendance.unshift(record);
    DB.save(db);

    renderAttendance(db.attendance);

    Utils.toast(
      type === 'entry' ? 'Entrada registrada' : 'Salida registrada',
      'success'
    );
  }

  // Render tabla
  function renderAttendance(list) {
    attendanceTableBody.innerHTML = '';

    list.forEach(r => {
      const tr = document.createElement('tr');

      const tdDate = document.createElement('td');
      tdDate.textContent = Utils.formatDateTime(r.ts);
      tr.appendChild(tdDate);

      const tdId = document.createElement('td');
      tdId.textContent = r.empId;
      tr.appendChild(tdId);

      const tdName = document.createElement('td');
      tdName.textContent = r.name;
      tr.appendChild(tdName);

      const tdType = document.createElement('td');
      tdType.textContent = r.type === 'entry' ? 'Entrada' : 'Salida';
      tr.appendChild(tdType);

      const tdActions = document.createElement('td');
      const btnDel = document.createElement('button');
      btnDel.textContent = 'Eliminar';
      btnDel.className = 'btn-inline btn-delete';

      btnDel.addEventListener('click', () => {
        deleteRecord(r.id);
      });

      tdActions.appendChild(btnDel);
      tr.appendChild(tdActions);

      attendanceTableBody.appendChild(tr);
    });
  }

  // Eliminar registro (sin confirm alert)
  function deleteRecord(id) {
    // pequeña confirmación usando toast estilo "info"
    Utils.toast('Registro eliminado', 'info');

    db.attendance = db.attendance.filter(x => x.id !== id);
    DB.save(db);
    renderAttendance(db.attendance);
  }

  // Refresh select empleados
  function refreshEmployeeSelect() {
    selectEmployee.innerHTML = '<option value="">-- Seleccione empleado --</option>';

    db.employees.forEach(e => {
      const opt = document.createElement('option');
      opt.value = e.id;
      opt.textContent = `${e.name} — ${e.id}`;
      selectEmployee.appendChild(opt);
    });
  }

  // Filtros
  function applyFilters() {
    const term = searchInput.value.trim().toLowerCase();
    const from = dateFrom.value;
    const to = dateTo.value;

    let list = db.attendance.slice();

    if (term) {
      list = list.filter(r =>
        r.name.toLowerCase().includes(term) ||
        r.empId.includes(term)
      );
    }

    list = Utils.filterByDateRange(list, from, to);

    renderAttendance(list);
    Utils.toast('Filtros aplicados', 'info');
  }

  // Inicializar
  document.addEventListener('DOMContentLoaded', init);

})();
