// Call the dataTables jQuery plugin
$(document).ready(function() {
  $('#dataTable').DataTable({
    responsive: true,
    processing: true,
    "language": {
      "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Portuguese-Brasil.json"
  }

  });
});
