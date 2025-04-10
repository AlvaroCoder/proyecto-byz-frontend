export function obtenerTopAgentes(dataUsuarios, dataPropiedades) {
    // Filtrar solo los corredores inmobiliarios
    const corredores = dataUsuarios.filter(
      (user) => user.role?.value === 'Corredor inmobiliario'
    );
  
    // Crear un mapa con conteo de propiedades por agente
    const contador = {};
  
    for (const propiedad of dataPropiedades) {
      if (!contador[propiedad.id_user]) {
        contador[propiedad.id_user] = 0;
      }
      contador[propiedad.id_user]++;
    }
  
    // Mapear a una estructura usable por el gráfico
    const agentesConConteo = corredores.map((agente) => ({
      name: agente.user_name,
      properties: contador[agente.id] || 0,
    }));
  
    // Ordenar y tomar los 5 con más propiedades
    const top5 = agentesConConteo
      .sort((a, b) => b.properties - a.properties)
      .slice(0, 5);
  
    return top5;
  }