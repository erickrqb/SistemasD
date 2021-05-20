$(document).ready(function() {
    var res_cve, opcion;
    opcion = 4;
        
    tablaUsuarios = $('#tablaUsuarios').DataTable({  
        "ajax":{            
            "url": "http://erqb-itp-sd-01.rf.gd/Api-Rest-H/crud.php", 
            "method": 'POST', 
            "data":{opcion:opcion}, 
            "dataSrc":"",
        },
        "columns":[
            {"data": "res_cve"},
            {"data": "res_persona"},
            {"data": "res_dias"},
            {"data": "res_fecha"},
            {"data": "lib_cve"},
            {"defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-success btn-sm btnEditar'>Editar</button><button class='btn btn-danger btn-sm btnBorrar'>borrar</button></div></div>"}
        ]
    });     
  
   
    var fila; 
    
    $('#formUsuarios').submit(function(e){                         
        e.preventDefault(); 
        res_persona = $.trim($('#res_persona').val());    
        res_dias = $.trim($('#res_dias').val());
        res_fecha = $.trim($('#res_fecha').val());    
        lib_cve = $.trim($('#lib_cve').val());                               
            $.ajax({
              url: "http://erqb-itp-sd-01.rf.gd/Api-Rest-H/crud.php",
              type: "POST",
              datatype:"json",    
              data:  {res_cve:res_cve, res_persona:res_persona, res_dias:res_dias, res_fecha:res_fecha, lib_cve:lib_cve ,opcion:opcion},    
              success: function(data) {
                tablaUsuarios.ajax.reload(null, false);
               }
            });			        
        $('#modalCRUD').modal('hide');											     			
    });
            
     
    
    //para limpiar los campos antes de dar de Alta una Persona
    $("#btnNuevo").click(function(){
        opcion = 1; //alta           
        res_cve=null;
        $("#formUsuarios").trigger("reset");
        $(".modal-header").css( "background-color", "#fffa50");
        $(".modal-header").css( "color", "black" );
        $(".modal-title").text("Agregar Reserva");
        $('#modalCRUD').modal('show');	    
    });
    
    //Editar        
    $(document).on("click", ".btnEditar", function(){		        
        opcion = 2;//editar
        fila = $(this).closest("tr");	        
        res_cve = parseInt(fila.find('td:eq(0)').text()); //capturo el ID		            
        res_persona = fila.find('td:eq(1)').text();
        res_dias = fila.find('td:eq(2)').text();
        res_fecha = fila.find('td:eq(3)').text();
        lib_cve = fila.find('td:eq(4)').text();
        $("#res_persona").val(res_persona);
        $("#res_dias").val(res_dias);
        $("#res_fecha").val(res_fecha);
        $("#lib_cve").val(lib_cve);
        $(".modal-header").css("background-color", "#4a4a47");
        $(".modal-header").css("color", "white" );
        $(".modal-title").text("Editar Reserva");		
        $('#modalCRUD').modal('show');		   
    });
    
    //Borrar
    $(document).on("click", ".btnBorrar", function(){
        fila = $(this);           
        res_cve = parseInt($(this).closest('tr').find('td:eq(0)').text()) ;		
        opcion = 3; //eliminar        
        var respuesta = confirm("Se borrara el registro "+res_cve+"?");                
        if (respuesta) {            
            $.ajax({
              url: "crud.php",
              type: "POST",
              datatype:"json",    
              data:  {opcion:opcion, res_cve:res_cve},    
              success: function() {
                  tablaUsuarios.row(fila.parents('tr')).remove().draw();                  
               }
            });	
        }
     });
         
    });    