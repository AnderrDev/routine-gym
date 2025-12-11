export interface ExerciseDatabaseEntry {
  name: string;
  description: string;
  instructions: string[];
  tips?: string[];
}

export const exerciseDatabase: Record<string, ExerciseDatabaseEntry> = {
  'press banca barra': {
    name: 'Press Banca con Barra',
    description: 'Ejercicio fundamental para el desarrollo del pecho, hombros y tríceps. Se realiza acostado en un banco plano.',
    instructions: [
      'Acuéstate en el banco con los pies firmes en el suelo',
      'Agarra la barra con las manos separadas al ancho de los hombros',
      'Baja la barra controladamente hasta tocar el pecho',
      'Empuja la barra hacia arriba con fuerza hasta extender los brazos',
      'Mantén los hombros y glúteos en contacto con el banco durante todo el movimiento'
    ],
    tips: [
      'No rebotes la barra en el pecho',
      'Mantén los codos a 45 grados del cuerpo',
      'Respira al bajar, exhala al subir'
    ]
  },
  'press inclinado mancuernas': {
    name: 'Press Inclinado con Mancuernas',
    description: 'Ejercicio para el desarrollo de la parte superior del pecho. Se realiza en banco inclinado a 30-45 grados.',
    instructions: [
      'Ajusta el banco a 30-45 grados de inclinación',
      'Siéntate con las mancuernas en los muslos',
      'Recuéstate y lleva las mancuernas a la altura del pecho',
      'Empuja las mancuernas hacia arriba y ligeramente juntas',
      'Baja controladamente hasta sentir el estiramiento en el pecho'
    ]
  },
  'press militar': {
    name: 'Press Militar',
    description: 'Ejercicio para hombros realizado de pie o sentado, presionando la barra o mancuernas por encima de la cabeza.',
    instructions: [
      'De pie o sentado, agarra la barra al ancho de los hombros',
      'Lleva la barra a la altura de los hombros',
      'Empuja la barra verticalmente por encima de la cabeza',
      'Baja controladamente hasta la altura de los hombros',
      'Mantén el core activo durante todo el movimiento'
    ]
  },
  'aperturas en polea': {
    name: 'Aperturas en Polea',
    description: 'Ejercicio de aislamiento para el pecho usando poleas, ideal para estirar y contraer los músculos pectorales.',
    instructions: [
      'Ajusta las poleas a la altura de los hombros',
      'Agarra las manijas con los brazos ligeramente flexionados',
      'Abre los brazos en un arco hasta sentir el estiramiento',
      'Cierra los brazos juntando las manijas frente al pecho',
      'Mantén una ligera flexión en los codos durante todo el movimiento'
    ]
  },
  'fondos': {
    name: 'Fondos (Dips)',
    description: 'Ejercicio compuesto para tríceps, hombros y pecho. Se realiza en barras paralelas o banco.',
    instructions: [
      'Agarra las barras paralelas con las palmas hacia adentro',
      'Baja el cuerpo flexionando los codos',
      'Baja hasta que los hombros estén al nivel de los codos',
      'Empuja hacia arriba extendiendo los brazos',
      'Mantén el cuerpo recto, no inclines hacia adelante'
    ],
    tips: [
      'Para más tríceps: mantén el cuerpo vertical',
      'Para más pecho: inclínate ligeramente hacia adelante'
    ]
  },
  'tríceps cuerda': {
    name: 'Tríceps con Cuerda',
    description: 'Ejercicio de aislamiento para tríceps usando polea con cuerda, excelente para la definición del brazo.',
    instructions: [
      'Ajusta la polea a la altura de los hombros o más alta',
      'Agarra la cuerda con las palmas enfrentadas',
      'Mantén los codos pegados al cuerpo',
      'Extiende los brazos hacia abajo separando las cuerdas',
      'Vuelve a la posición inicial controladamente'
    ]
  },
  'dominadas lastradas': {
    name: 'Dominadas Lastradas',
    description: 'Ejercicio avanzado para espalda y bíceps, añadiendo peso adicional para mayor resistencia.',
    instructions: [
      'Cuelga un peso adicional con un cinturón o chaleco',
      'Agarra la barra con las palmas hacia adelante',
      'Cuelga con los brazos completamente extendidos',
      'Tira del cuerpo hacia arriba hasta que la barbilla pase la barra',
      'Baja controladamente hasta la posición inicial'
    ]
  },
  'remo con barra': {
    name: 'Remo con Barra',
    description: 'Ejercicio fundamental para el desarrollo de la espalda, especialmente el dorsal ancho y romboides.',
    instructions: [
      'De pie, flexiona las rodillas y flexiona la cadera manteniendo la espalda recta',
      'Agarra la barra con las manos separadas al ancho de los hombros',
      'Tira de la barra hacia el abdomen',
      'Aprieta los omóplatos al final del movimiento',
      'Baja la barra controladamente'
    ]
  },
  'jalón cerrado': {
    name: 'Jalón Cerrado',
    description: 'Ejercicio para espalda realizado en máquina de polea, agarrando la barra con las manos juntas.',
    instructions: [
      'Siéntate en la máquina con los muslos sujetos',
      'Agarra la barra con agarre cerrado (manos juntas)',
      'Tira de la barra hacia el pecho',
      'Aprieta los omóplatos al final del movimiento',
      'Vuelve a la posición inicial controladamente'
    ]
  },
  'remo en polea': {
    name: 'Remo en Polea',
    description: 'Ejercicio para espalda realizado sentado en máquina de polea, ideal para el grosor de la espalda.',
    instructions: [
      'Siéntate en la máquina con los pies en la plataforma',
      'Agarra la manija con ambas manos',
      'Tira de la manija hacia el abdomen',
      'Mantén la espalda recta y aprieta los omóplatos',
      'Vuelve a la posición inicial controladamente'
    ]
  },
  'face pulls': {
    name: 'Face Pulls',
    description: 'Ejercicio para los deltoides posteriores y músculos de la espalda alta, importante para la postura.',
    instructions: [
      'Ajusta la polea a la altura de los ojos',
      'Agarra la cuerda con las palmas enfrentadas',
      'Tira de la cuerda hacia la cara separando las manos',
      'Lleva las manos a los lados de la cara',
      'Aprieta los deltoides posteriores al final del movimiento'
    ]
  },
  'curl bíceps barra': {
    name: 'Curl de Bíceps con Barra',
    description: 'Ejercicio clásico para el desarrollo de los bíceps usando barra recta o EZ.',
    instructions: [
      'De pie, agarra la barra con las palmas hacia arriba',
      'Mantén los codos pegados al cuerpo',
      'Flexiona los brazos levantando la barra hacia los hombros',
      'Aprieta los bíceps en la parte superior',
      'Baja la barra controladamente'
    ]
  },
  'curl martillo': {
    name: 'Curl Martillo',
    description: 'Ejercicio para bíceps y antebrazos usando mancuernas con agarre neutro (palmas enfrentadas).',
    instructions: [
      'De pie, agarra las mancuernas con las palmas enfrentadas',
      'Mantén los codos pegados al cuerpo',
      'Levanta las mancuernas flexionando los brazos',
      'Mantén el agarre neutro durante todo el movimiento',
      'Baja controladamente'
    ]
  },
  'sentadilla libre': {
    name: 'Sentadilla Libre',
    description: 'El rey de los ejercicios para piernas. Trabaja cuádriceps, glúteos y core.',
    instructions: [
      'Coloca la barra sobre los trapecios',
      'Pies separados al ancho de los hombros',
      'Baja flexionando cadera y rodillas',
      'Baja hasta que los muslos estén paralelos al suelo',
      'Empuja con los talones para volver a la posición inicial'
    ],
    tips: [
      'Mantén las rodillas alineadas con los pies',
      'No dejes que las rodillas se vayan hacia adentro',
      'Mantén el pecho alto y la espalda recta'
    ]
  },
  'prensa': {
    name: 'Prensa de Piernas',
    description: 'Ejercicio para piernas realizado en máquina, ideal para trabajar cuádriceps y glúteos con seguridad.',
    instructions: [
      'Siéntate en la máquina con la espalda completamente apoyada',
      'Coloca los pies en la plataforma al ancho de los hombros',
      'Baja la plataforma flexionando las rodillas',
      'Baja hasta formar un ángulo de 90 grados',
      'Empuja la plataforma extendiendo las piernas'
    ]
  },
  'extensiones cuádriceps': {
    name: 'Extensiones de Cuádriceps',
    description: 'Ejercicio de aislamiento para cuádriceps realizado en máquina sentado.',
    instructions: [
      'Siéntate en la máquina con la espalda apoyada',
      'Coloca los tobillos bajo las almohadillas',
      'Extiende las piernas levantando el peso',
      'Aprieta los cuádriceps en la parte superior',
      'Baja controladamente'
    ]
  },
  'zancadas': {
    name: 'Zancadas',
    description: 'Ejercicio unilateral para piernas que trabaja cuádriceps, glúteos y mejora el equilibrio.',
    instructions: [
      'De pie, da un paso largo hacia adelante',
      'Baja la rodilla trasera hacia el suelo',
      'Mantén la rodilla delantera sobre el tobillo',
      'Empuja con el talón delantero para volver',
      'Alterna las piernas'
    ]
  },
  'gemelos de pie': {
    name: 'Elevación de Gemelos de Pie',
    description: 'Ejercicio para los músculos de la pantorrilla (gastrocnemio) realizado de pie.',
    instructions: [
      'De pie en una máquina o con peso libre',
      'Coloca las puntas de los pies en el borde de la plataforma',
      'Baja los talones lo máximo posible',
      'Eleva los talones contrayendo los gemelos',
      'Mantén la contracción en la parte superior'
    ]
  },
  'peso muerto rumano': {
    name: 'Peso Muerto Rumano',
    description: 'Ejercicio para isquiotibiales, glúteos y espalda baja. Se realiza con barra o mancuernas.',
    instructions: [
      'De pie, agarra la barra con las palmas hacia abajo',
      'Mantén las piernas casi rectas con ligera flexión',
      'Flexiona la cadera llevando la barra hacia abajo',
      'Baja hasta sentir el estiramiento en los isquiotibiales',
      'Vuelve a la posición inicial contrayendo glúteos e isquiotibiales'
    ],
    tips: [
      'Mantén la espalda recta durante todo el movimiento',
      'No redondees la espalda',
      'Siente el estiramiento en la parte posterior de las piernas'
    ]
  },
  'hip thrust': {
    name: 'Hip Thrust',
    description: 'Ejercicio excelente para glúteos realizado con la espalda apoyada en un banco.',
    instructions: [
      'Siéntate en el suelo con la espalda contra un banco',
      'Coloca la barra sobre la cadera',
      'Flexiona las rodillas con los pies en el suelo',
      'Empuja la cadera hacia arriba contrayendo los glúteos',
      'Mantén la contracción en la parte superior y baja controladamente'
    ]
  },
  'curl femoral': {
    name: 'Curl de Femoral',
    description: 'Ejercicio de aislamiento para isquiotibiales realizado en máquina acostado o sentado.',
    instructions: [
      'Acuéstate o siéntate en la máquina',
      'Coloca los talones bajo las almohadillas',
      'Flexiona las rodillas llevando los talones hacia los glúteos',
      'Aprieta los isquiotibiales en la parte superior',
      'Baja controladamente'
    ]
  },
  'sentadilla búlgara': {
    name: 'Sentadilla Búlgara',
    description: 'Ejercicio unilateral para piernas que trabaja cuádriceps y glúteos con una pierna elevada.',
    instructions: [
      'Coloca el empeine del pie trasero en un banco',
      'Da un paso largo con la pierna delantera',
      'Baja la rodilla trasera hacia el suelo',
      'Mantén el torso erguido',
      'Empuja con el talón delantero para volver'
    ]
  },
  'plancha': {
    name: 'Plancha',
    description: 'Ejercicio isométrico para el core que fortalece abdomen, espalda baja y estabilizadores.',
    instructions: [
      'Colócate en posición de flexión con los antebrazos en el suelo',
      'Mantén el cuerpo en línea recta desde la cabeza hasta los talones',
      'Contrae el core y los glúteos',
      'Mantén la posición el tiempo indicado',
      'Respira normalmente durante el ejercicio'
    ],
    tips: [
      'No dejes que la cadera se hunda',
      'Mantén el cuello en línea con la columna',
      'Si es muy difícil, empieza con las rodillas en el suelo'
    ]
  },
  'sentadilla goblet': {
    name: 'Sentadilla Goblet',
    description: 'Variante de sentadilla realizada sosteniendo una mancuerna o kettlebell frente al pecho.',
    instructions: [
      'Sostén una mancuerna o kettlebell frente al pecho',
      'Pies separados al ancho de los hombros',
      'Baja flexionando cadera y rodillas',
      'Mantén el peso cerca del pecho',
      'Baja hasta que los muslos estén paralelos al suelo y vuelve'
    ]
  },
  'remo polea baja': {
    name: 'Remo en Polea Baja',
    description: 'Ejercicio para espalda realizado sentado en máquina de polea baja, ideal para el grosor de la espalda.',
    instructions: [
      'Siéntate en la máquina con los pies en la plataforma',
      'Agarra la manija con ambas manos',
      'Tira de la manija hacia el abdomen',
      'Mantén la espalda recta y aprieta los omóplatos',
      'Vuelve a la posición inicial controladamente'
    ]
  },
  'tríceps francés': {
    name: 'Tríceps Francés',
    description: 'Ejercicio de aislamiento para tríceps realizado acostado, extendiendo la barra o mancuernas.',
    instructions: [
      'Acuéstate en un banco plano',
      'Agarra la barra o mancuernas con los brazos extendidos',
      'Flexiona los codos bajando el peso hacia la frente',
      'Mantén los codos apuntando hacia arriba',
      'Extiende los brazos volviendo a la posición inicial'
    ]
  },
  'press inclinado ligero (finisher)': {
    name: 'Press Inclinado Ligero (Finisher)',
    description: 'Ejercicio finisher de alta intensidad para el pecho. Se realiza con peso ligero en formato de intervalos.',
    instructions: [
      'Usa un peso ligero (30-40% de tu máximo)',
      'Ajusta el banco a 30-45 grados',
      'Realiza el máximo de repeticiones en 30 segundos',
      'Descansa 30 segundos',
      'Repite por el número de series indicado',
      'Mantén un ritmo constante y controlado'
    ],
    tips: [
      'El objetivo es la resistencia, no el peso máximo',
      'Mantén buena forma técnica incluso cuando estés cansado',
      'Respira de forma constante durante todo el ejercicio'
    ]
  },
  'pullover polea (finisher)': {
    name: 'Pullover en Polea (Finisher)',
    description: 'Ejercicio finisher para el pecho y serrato anterior. Se realiza en polea alta con movimiento de arco.',
    instructions: [
      'Ajusta la polea a la altura más alta',
      'Agarra la manija con ambas manos',
      'Arrodíllate o siéntate frente a la polea',
      'Tira de la manija en un arco hacia abajo y adelante',
      'Lleva las manos hacia las caderas',
      'Vuelve a la posición inicial controladamente',
      'Realiza las repeticiones indicadas sin descanso'
    ]
  },
  'sentadilla ligera (finisher)': {
    name: 'Sentadilla Ligera (Finisher)',
    description: 'Ejercicio finisher de resistencia para piernas. Se realiza con peso ligero o solo con el peso corporal durante 1 minuto.',
    instructions: [
      'Usa un peso ligero o solo el peso corporal',
      'Pies separados al ancho de los hombros',
      'Realiza sentadillas continuas durante 1 minuto',
      'Mantén un ritmo constante',
      'Baja hasta que los muslos estén paralelos al suelo',
      'No te detengas hasta completar el tiempo'
    ],
    tips: [
      'El objetivo es resistencia, no peso máximo',
      'Mantén la forma técnica correcta',
      'Respira de forma constante'
    ]
  },
  'laterales 50 reps (finisher)': {
    name: 'Elevaciones Laterales 50 Reps (Finisher)',
    description: 'Ejercicio finisher de alta resistencia para deltoides laterales. Realiza 50 repeticiones continuas.',
    instructions: [
      'Usa un peso ligero (mancuernas o polea)',
      'De pie con los brazos a los lados',
      'Eleva los brazos lateralmente hasta la altura de los hombros',
      'Mantén una ligera flexión en los codos',
      'Baja controladamente',
      'Realiza 50 repeticiones continuas sin descanso'
    ],
    tips: [
      'El peso debe ser ligero para poder completar las 50 reps',
      'Mantén el movimiento controlado',
      'No uses impulso, usa solo los deltoides'
    ]
  },
  'curls 21 (finisher)': {
    name: 'Curls 21 (Finisher)',
    description: 'Ejercicio finisher para bíceps. Consiste en 21 repeticiones divididas en 3 fases: 7 parciales inferiores, 7 parciales superiores, 7 completas.',
    instructions: [
      'Agarra la barra con las palmas hacia arriba',
      'Realiza 7 repeticiones desde abajo hasta la mitad del movimiento',
      'Sin descanso, realiza 7 repeticiones desde la mitad hasta arriba',
      'Sin descanso, realiza 7 repeticiones completas',
      'Total: 21 repeticiones sin descanso entre fases'
    ],
    tips: [
      'Mantén los codos pegados al cuerpo',
      'No uses impulso, controla el movimiento',
      'Este es un ejercicio de alta intensidad'
    ]
  },
  'puente glúteo (finisher)': {
    name: 'Puente de Glúteo (Finisher)',
    description: 'Ejercicio finisher isométrico para glúteos. Mantén la posición del puente durante 60 segundos.',
    instructions: [
      'Acuéstate boca arriba con las rodillas flexionadas',
      'Pies separados al ancho de los hombros',
      'Eleva la cadera contrayendo los glúteos',
      'Mantén el cuerpo en línea recta desde rodillas hasta hombros',
      'Mantén la posición durante 60 segundos',
      'Respira normalmente durante el ejercicio'
    ],
    tips: [
      'Aprieta los glúteos fuertemente',
      'No dejes que la cadera se hunda',
      'Si es muy difícil, empieza con menos tiempo y aumenta progresivamente'
    ]
  },
  'circuito de abdomen': {
    name: 'Circuito de Abdomen',
    description: 'Circuito completo de ejercicios abdominales que combina varios movimientos para trabajar todo el core.',
    instructions: [
      'Realiza cada ejercicio del circuito sin descanso entre ellos',
      'Descansa solo al finalizar todo el circuito',
      'Ejercicios típicos: crunches, elevaciones de piernas, plancha, oblicuos',
      'Mantén el core activo durante todo el circuito',
      'Realiza el número de repeticiones o tiempo indicado para cada ejercicio'
    ],
    tips: [
      'Mantén la respiración constante',
      'No uses el cuello para hacer fuerza',
      'Enfócate en contraer el abdomen'
    ]
  },
  'press arnold': {
    name: 'Press Arnold',
    description: 'Variante del press de hombros creada por Arnold Schwarzenegger. Combina rotación con press.',
    instructions: [
      'Siéntate en un banco con respaldo',
      'Agarra las mancuernas con las palmas hacia ti (rotación interna)',
      'Lleva las mancuernas a la altura de los hombros',
      'Rota las muñecas mientras presionas hacia arriba',
      'Termina con las palmas hacia adelante y brazos extendidos',
      'Baja rotando de vuelta a la posición inicial'
    ]
  },
  'elevaciones laterales estrictas': {
    name: 'Elevaciones Laterales Estrictas',
    description: 'Ejercicio de aislamiento para deltoides laterales realizado con movimiento controlado y estricto.',
    instructions: [
      'De pie, agarra mancuernas con los brazos a los lados',
      'Eleva los brazos lateralmente hasta la altura de los hombros',
      'Mantén una ligera flexión en los codos',
      'Mantén el movimiento controlado, sin impulso',
      'Baja controladamente hasta la posición inicial'
    ],
    tips: [
      'No uses peso excesivo, prioriza la forma',
      'Mantén los brazos ligeramente flexionados',
      'Siente la contracción en los deltoides laterales'
    ]
  },
  'elevaciones laterales pesadas': {
    name: 'Elevaciones Laterales Pesadas',
    description: 'Variante de elevaciones laterales con peso más pesado para mayor resistencia y desarrollo muscular.',
    instructions: [
      'De pie, agarra mancuernas más pesadas',
      'Eleva los brazos lateralmente con control',
      'Puedes usar un ligero impulso al inicio del movimiento',
      'Mantén el control en la parte negativa',
      'Baja controladamente'
    ],
    tips: [
      'Usa más peso que en las elevaciones estrictas',
      'Mantén buena forma técnica',
      'Este ejercicio es para fuerza, no solo definición'
    ]
  },
  'pájaros en polea': {
    name: 'Pájaros en Polea',
    description: 'Ejercicio para deltoides posteriores realizado en polea, también conocido como rear delt fly.',
    instructions: [
      'Ajusta las poleas a la altura de los hombros',
      'Agarra las manijas con los brazos extendidos',
      'Abre los brazos en un arco hacia atrás',
      'Aprieta los deltoides posteriores al final del movimiento',
      'Vuelve a la posición inicial controladamente'
    ]
  },
  'crunch en polea': {
    name: 'Crunch en Polea',
    description: 'Ejercicio para abdominales realizado en polea alta, proporcionando resistencia constante.',
    instructions: [
      'Ajusta la polea a la altura más alta',
      'Arrodíllate frente a la polea',
      'Agarra la cuerda y llévala detrás de la cabeza',
      'Flexiona el tronco contrayendo el abdomen',
      'Vuelve a la posición inicial controladamente'
    ]
  },
  'elevación de piernas': {
    name: 'Elevación de Piernas',
    description: 'Ejercicio para abdominales inferiores realizado elevando las piernas.',
    instructions: [
      'Acuéstate boca arriba con las manos bajo los glúteos',
      'Eleva las piernas rectas hacia arriba',
      'Lleva las piernas lo más alto posible',
      'Baja controladamente sin tocar el suelo',
      'Mantén el abdomen contraído durante todo el movimiento'
    ],
    tips: [
      'No uses impulso, controla el movimiento',
      'Mantén la espalda baja en contacto con el suelo',
      'Respira al bajar, exhala al subir'
    ]
  },
  'remo máquina pecho': {
    name: 'Remo en Máquina de Pecho',
    description: 'Ejercicio para espalda realizado en máquina de remo sentado, apoyando el pecho en el respaldo.',
    instructions: [
      'Siéntate en la máquina con el pecho apoyado en el respaldo',
      'Agarra las manijas con las palmas enfrentadas',
      'Tira de las manijas hacia el pecho',
      'Aprieta los omóplatos al final del movimiento',
      'Vuelve a la posición inicial controladamente'
    ]
  },
  'jalón al pecho': {
    name: 'Jalón al Pecho',
    description: 'Ejercicio para espalda realizado en máquina de polea, jalando la barra hacia el pecho.',
    instructions: [
      'Siéntate en la máquina con los muslos sujetos',
      'Agarra la barra con agarre amplio',
      'Tira de la barra hacia el pecho',
      'Inclínate ligeramente hacia atrás',
      'Aprieta los omóplatos al final',
      'Vuelve a la posición inicial controladamente'
    ]
  },
  'remo unilateral mancuerna': {
    name: 'Remo Unilateral con Mancuerna',
    description: 'Ejercicio para espalda realizado con una mancuerna, trabajando un lado a la vez.',
    instructions: [
      'Coloca una rodilla y la mano del mismo lado en un banco',
      'Agarra la mancuerna con la mano libre',
      'Mantén la espalda recta y paralela al suelo',
      'Tira de la mancuerna hacia el abdomen',
      'Aprieta el omóplato al final del movimiento',
      'Baja controladamente y repite con el otro lado'
    ]
  },
  'curl bíceps polea': {
    name: 'Curl de Bíceps en Polea',
    description: 'Ejercicio para bíceps realizado en polea baja, proporcionando resistencia constante.',
    instructions: [
      'Ajusta la polea a la altura más baja',
      'De pie frente a la polea',
      'Agarra la barra o manija con las palmas hacia arriba',
      'Flexiona los brazos levantando el peso',
      'Mantén los codos pegados al cuerpo',
      'Baja controladamente'
    ]
  },
  'curl inclinado mancuernas': {
    name: 'Curl Inclinado con Mancuernas',
    description: 'Ejercicio para bíceps realizado en banco inclinado, proporcionando mayor estiramiento.',
    instructions: [
      'Ajusta el banco a 45-60 grados de inclinación',
      'Siéntate con las mancuernas en las manos',
      'Deja que los brazos cuelguen naturalmente',
      'Flexiona los brazos levantando las mancuernas',
      'Aprieta los bíceps en la parte superior',
      'Baja controladamente sintiendo el estiramiento'
    ]
  },
  'curl + tríceps (superserie)': {
    name: 'Curl + Tríceps (Superserie)',
    description: 'Superserie que combina curl de bíceps y extensión de tríceps sin descanso entre ejercicios.',
    instructions: [
      'Realiza curl de bíceps con el peso indicado',
      'Sin descanso, cambia a extensión de tríceps',
      'Puedes usar mancuernas, polea o barra',
      'Alterna entre ambos ejercicios',
      'Descansa solo al completar ambas series',
      'Mantén buena forma técnica en ambos ejercicios'
    ],
    tips: [
      'Este es un ejercicio de alta intensidad',
      'Usa un peso moderado para mantener la forma',
      'Respira constantemente durante todo el ejercicio'
    ]
  }
};

