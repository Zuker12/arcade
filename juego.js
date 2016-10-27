var juego = 
{
	filas: [ [] , [] , [] ],
	espacioVacio: 
	{
		fila: 2,
		columna: 2
	},

	iniciar: function (x) 
	{
	   this.instalarPiezas(x)
       this.mezclarPiezas(100);
       this.capturarTeclas();
       	},

	crearPieza: function (idImagen, fi, co) 
	{
		var $ficha = $("<div>");
		$ficha.addClass("pieza");
		$ficha.css(
			{
				top: fi * 240,
				left: co * 426,
				backgroundImage: "url(piezas/" + idImagen + ".jpeg)"
			});

        return {
            filaInicial: fi,
            columnaInicial: co,
            $ficha: $ficha
        };
	},
	instalarPiezas: function (tablero) 
	{
		var contador = 0;
		for (var fi = 0; fi < 3; fi++) 
		{
		  for (var co = 0; co < 3; co++) 
		  {
		  	 if (this.espacioVacio.columna === co
		  	 	&& this.espacioVacio.fila === fi) 
		  	 {
		  	 	this.filas[fi][co] = null;
		  	 } 
		  	 else
		  	 {
		  	 	contador = contador + 1; 
		  	 	var pieza = this.crearPieza(contador, fi, co);
		  	 	this.filas[fi][co] = pieza;
		  	 	tablero.append(pieza.$ficha);
		  	 }
		  }	
		}
	},

	mezclarPiezas: function (veces)
	{
      var that = this;
      var espera = 20;
      for (var i = 0; i < veces; i++)
      {
      	var numeroAleatorio = Math.random();
      	if (numeroAleatorio > 0.75) 
      	{
      		setTimeout(function(){that.moverHaciaArriba(); }, i * espera);
      	}
      	else if (numeroAleatorio > 0.5)
      	{
          setTimeout(function(){that.moverHaciaAbajo(); }, i * espera);
      	}
      	else if (numeroAleatorio > 0.25)
      	{
          setTimeout(function(){that.moverHaciaLaIzquierda(); }, i * espera);
      	}
      	else
      	{
          setTimeout(function(){that.moverHaciaLaDerecha(); }, i * espera);
      	}      	
      }
      
	},

	chequearSiGano: function()
	{
      for (var co = 0; co < 3; co++)
        {
      	for (var fi = 0; fi < 3; fi++)
      		if (this.espacioVacio.columna !== co
      			|| this.espacioVacio.fila !== fi)
      		{
      			var pieza = this.filas[fi][co];
      			if (co!== pieza.columnaInicial
      				|| fi !== pieza.filaInicial) 
      			{
      				return false;
      			}
      		}
        }
        setTimeout(function(){alert("Ganastessss");}, 500);
        return true;
	},

    moverHaciaAbajo: function (abajo)
    {
        var filaOrigen = this.espacioVacio.fila-1;
        var columnaOrigen = this.espacioVacio.columna;
        this.intercambiarPosicionEspacioVacio(filaOrigen, columnaOrigen);
    },

    moverHaciaArriba: function (arriba)
    {
        var filaOrigen = this.espacioVacio.fila+1;
        var columnaOrigen = this.espacioVacio.columna;
        this.intercambiarPosicionEspacioVacio(filaOrigen, columnaOrigen);
    },

    moverHaciaLaDerecha: function (derecha)
    {
        var filaOrigen = this.espacioVacio.fila;
        var columnaOrigen = this.espacioVacio.columna-1;
        this.intercambiarPosicionEspacioVacio(filaOrigen, columnaOrigen);
    },

    moverHaciaLaIzquierda: function (izquierda)
    {
        var filaOrigen = this.espacioVacio.fila;
        var columnaOrigen = this.espacioVacio.columna+1;
        this.intercambiarPosicionEspacioVacio(filaOrigen, columnaOrigen);
    },

    moverFichaFilaColumna: function ($ficha, fi, co)
    {
        $ficha.css(
            {
                top: fi * 240,
                left: co * 426,
            });
    },

    guardarEspacioVacio: function (fi, co) 
    {
      this.espacioVacio.fila = fi;
      this.espacioVacio.columna = co;
      this.filas[fi][co] = null;
    },

    intercambiarPosicionEspacioVacio: function (fi, co) 
    {
      var ficha = this.filas[fi] && this.filas[fi][co];
      if(ficha !== undefined)
      {
        this.filas[this.espacioVacio.fila][this.espacioVacio.columna] = ficha;
        this.moverFichaFilaColumna(ficha.$ficha, this.espacioVacio.fila, this.espacioVacio.columna);
        this.guardarEspacioVacio(fi, co);
      }
    }, 

    capturarTeclas: function (capture)
    {
        var that = this;
        $(document).keydown(function(evento) 
        {
        	switch(evento.which)
         {
         	case 37:
         	 that.moverHaciaLaIzquierda();
         	 that.chequearSiGano();
         	 break;

         	case 38:
         	 that.moverHaciaArriba();
         	 that.chequearSiGano();
         	 break;

         	case 39:
         	 that.moverHaciaLaDerecha();
         	 that.chequearSiGano();
         	 break;
         	 
         	case 40:
         	 that.moverHaciaAbajo();
         	 that.chequearSiGano();
         	 break;

         	default: return;    
         }

        evento.preventDefault();
    	});
    }
};



$(document).ready(function() 
{
	juego.iniciar( $("#juego") );

});






