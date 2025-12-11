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
  'press plano mancuernas o máquina pecho': {
    name: 'Press Plano con Mancuernas o Máquina de Pecho',
    description: 'Ejercicio para el pecho realizado en banco plano. Las mancuernas proporcionan mayor rango de movimiento, mientras que la máquina ofrece estabilidad y seguridad.',
    instructions: [
      'Si usas mancuernas: acuéstate en banco plano con las mancuernas en los muslos',
      'Si usas máquina: ajusta el asiento y agarra las manijas',
      'Con mancuernas: lleva las mancuernas a la altura del pecho',
      'Empuja el peso hacia arriba hasta extender los brazos',
      'Baja controladamente hasta sentir el estiramiento completo en el pecho',
      'Mantén los codos a 45 grados del cuerpo',
      'Aprieta el pecho en la parte superior del movimiento'
    ],
    tips: [
      'Las mancuernas permiten mayor rango de movimiento y activación de estabilizadores',
      'La máquina es más segura y permite concentrarse solo en el empuje',
      'Mantén los hombros y glúteos en contacto con el banco',
      'No rebotes el peso en el pecho',
      'Respira al bajar, exhala al subir'
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
  'press militar barra o mancuernas': {
    name: 'Press Militar con Barra o Mancuernas',
    description: 'Ejercicio fundamental para hombros que activa principalmente el deltoide anterior. Se puede realizar con barra o mancuernas.',
    instructions: [
      'De pie o sentado, agarra la barra o mancuernas al ancho de los hombros',
      'Lleva el peso a la altura de los hombros',
      'Empuja verticalmente por encima de la cabeza',
      'Mantén los codos ligeramente hacia adelante',
      'Baja controladamente hasta la altura de los hombros',
      'Mantén el core activo y la espalda recta durante todo el movimiento'
    ],
    tips: [
      'Con mancuernas tienes mayor rango de movimiento',
      'Con barra puedes manejar más peso',
      'No arquees excesivamente la espalda baja',
      'Respira al bajar, exhala al subir'
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
  'aperturas en polea (alto → bajo)': {
    name: 'Aperturas en Polea (Alto → Bajo)',
    description: 'Variante de aperturas en polea con movimiento desde arriba hacia abajo, proporcionando mejor rango de movimiento y aislamiento del pecho.',
    instructions: [
      'Ajusta las poleas a la altura más alta (por encima de los hombros)',
      'Agarra las manijas con los brazos ligeramente flexionados',
      'Abre los brazos en un arco descendente',
      'Lleva las manijas hacia abajo y adelante, juntándolas frente a la parte inferior del pecho',
      'Siente el estiramiento completo del pecho en la posición inicial',
      'Contrae el pecho al juntar las manijas',
      'Mantén una ligera flexión en los codos durante todo el movimiento'
    ],
    tips: [
      'Este movimiento proporciona mayor rango de movimiento que las aperturas tradicionales',
      'Enfócate en sentir el estiramiento en la parte superior del movimiento',
      'Controla la fase negativa (apertura) para mayor activación muscular',
      'Mantén el torso estable durante todo el ejercicio'
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
  'extensión tríceps en polea': {
    name: 'Extensión de Tríceps en Polea',
    description: 'Ejercicio de aislamiento para tríceps realizado en polea, ideal para trabajar las tres cabezas del tríceps sin fatiga del codo.',
    instructions: [
      'Ajusta la polea a la altura más alta',
      'Agarra la barra recta o cuerda con las palmas hacia abajo',
      'Mantén los codos pegados al cuerpo y apuntando hacia adelante',
      'Extiende los brazos hacia abajo hasta la extensión completa',
      'Aprieta los tríceps en la parte inferior del movimiento',
      'Vuelve a la posición inicial controladamente, sintiendo el estiramiento',
      'Mantén el torso recto y los codos estables durante todo el ejercicio'
    ],
    tips: [
      'Mantén los codos completamente inmóviles, solo mueve los antebrazos',
      'No uses impulso del cuerpo para extender',
      'Siente la contracción completa en la parte inferior',
      'Puedes usar barra recta para más estabilidad o cuerda para mayor rango de movimiento',
      'Este ejercicio es excelente para aislar el tríceps sin fatigar los codos'
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
  'face pulls moderados': {
    name: 'Face Pulls Moderados',
    description: 'Ejercicio excelente para el trapecio inferior y hombro posterior, mejorando la postura y estética. Se realiza con peso moderado enfocándose en la técnica.',
    instructions: [
      'Ajusta la polea a la altura de los ojos',
      'Usa un peso moderado (no máximo)',
      'Agarra la cuerda con las palmas enfrentadas',
      'Tira de la cuerda hacia la cara separando las manos',
      'Lleva las manos a los lados de la cara',
      'Aprieta los deltoides posteriores y trapecio inferior al final del movimiento',
      'Mantén el movimiento controlado y enfocado en la técnica',
      'Vuelve a la posición inicial controladamente'
    ],
    tips: [
      'El peso moderado permite mejor técnica y activación',
      'Excelente para mejorar la postura',
      'Trabaja el trapecio inferior y hombro posterior',
      'No uses peso excesivo, prioriza la forma correcta',
      'Este ejercicio es clave para la estética de los hombros'
    ]
  },
  'face pull': {
    name: 'Face Pull',
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
  'curl martillo o rope hammer': {
    name: 'Curl Martillo o Rope Hammer',
    description: 'Ejercicio para bíceps, braquial y antebrazos que engrosa el brazo. Se puede realizar con mancuernas o cuerda en polea.',
    instructions: [
      'Si usas mancuernas: de pie, agarra las mancuernas con las palmas enfrentadas',
      'Si usas polea: ajusta la polea baja y agarra la cuerda con las palmas enfrentadas',
      'Mantén los codos pegados al cuerpo',
      'Levanta el peso flexionando los brazos',
      'Mantén el agarre neutro durante todo el movimiento',
      'Aprieta el braquial y bíceps en la parte superior',
      'Baja controladamente sintiendo el estiramiento'
    ],
    tips: [
      'Este ejercicio engrosa el brazo trabajando el braquial',
      'También fortalece los antebrazos',
      'Mantén el movimiento controlado, no uses impulso',
      'La polea proporciona tensión constante',
      'Enfócate en la contracción del braquial'
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
  'hack squat': {
    name: 'Hack Squat',
    description: 'Ejercicio para cuádriceps realizado en máquina hack squat, proporcionando activación top-tier del cuádriceps con soporte para la espalda.',
    instructions: [
      'Colócate en la máquina hack squat con los hombros bajo las almohadillas',
      'Coloca los pies en la plataforma separados al ancho de los hombros',
      'Mantén la espalda completamente apoyada en el respaldo',
      'Desbloquea la máquina y baja flexionando las rodillas',
      'Baja hasta que los muslos estén paralelos al suelo o más profundo',
      'Empuja con los talones extendiendo las piernas',
      'Mantén el torso recto durante todo el movimiento'
    ],
    tips: [
      'La máquina hack squat proporciona activación superior del cuádriceps',
      'Mantén los pies en el centro de la plataforma para equilibrio',
      'Puedes ajustar la posición de los pies para enfocar diferentes áreas',
      'No bloquees las rodillas en la parte superior',
      'Este ejercicio es excelente para trabajar cuádriceps sin cargar la espalda baja'
    ]
  },
  'sentadilla hack': {
    name: 'Sentadilla Hack',
    description: 'Ejercicio para cuádriceps realizado en máquina hack squat. Ideal para entrenamiento metabólico con peso ligero a moderado para alta repetición.',
    instructions: [
      'Colócate en la máquina hack squat con los hombros bajo las almohadillas',
      'Coloca los pies en la plataforma separados al ancho de los hombros',
      'Usa un peso ligero a moderado (50-60% de tu máximo)',
      'Mantén la espalda completamente apoyada en el respaldo',
      'Desbloquea la máquina y baja flexionando las rodillas',
      'Baja hasta que los muslos estén paralelos al suelo',
      'Empuja con los talones extendiendo las piernas',
      'Mantén un ritmo constante y controlado',
      'Realiza las repeticiones indicadas sin descanso prolongado'
    ],
    tips: [
      'El peso ligero permite mayor repetición y efecto metabólico',
      'Mantén el ritmo constante durante todas las repeticiones',
      'Este ejercicio es ideal para entrenamiento de resistencia',
      'No bloquees las rodillas en la parte superior',
      'Respira de forma constante durante todo el ejercicio'
    ]
  },
  'sentadilla hack (ligera)': {
    name: 'Sentadilla Hack (Ligera)',
    description: 'Variante ligera de hack squat para entrenamiento metabólico. Se realiza con peso ligero o moderado para alta repetición.',
    instructions: [
      'Colócate en la máquina hack squat con los hombros bajo las almohadillas',
      'Coloca los pies en la plataforma separados al ancho de los hombros',
      'Usa un peso ligero a moderado (50-60% de tu máximo)',
      'Mantén la espalda completamente apoyada en el respaldo',
      'Desbloquea la máquina y baja flexionando las rodillas',
      'Baja hasta que los muslos estén paralelos al suelo',
      'Empuja con los talones extendiendo las piernas',
      'Mantén un ritmo constante y controlado',
      'Realiza las repeticiones indicadas sin descanso prolongado'
    ],
    tips: [
      'El peso ligero permite mayor repetición y efecto metabólico',
      'Mantén el ritmo constante durante todas las repeticiones',
      'Este ejercicio es ideal para entrenamiento de resistencia',
      'No bloquees las rodillas en la parte superior',
      'Respira de forma constante durante todo el ejercicio'
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
  'prensa inclinada pies bajos': {
    name: 'Prensa Inclinada con Pies Bajos',
    description: 'Variante de prensa con los pies colocados en la parte inferior de la plataforma, aumentando la activación de cuádriceps y proporcionando tensión constante.',
    instructions: [
      'Siéntate en la máquina de prensa inclinada con la espalda completamente apoyada',
      'Coloca los pies en la parte inferior de la plataforma (más abajo de lo normal)',
      'Mantén los pies separados al ancho de los hombros',
      'Baja la plataforma flexionando las rodillas',
      'Baja hasta formar un ángulo de 90 grados o más profundo',
      'Empuja la plataforma extendiendo las piernas',
      'Mantén los talones en contacto con la plataforma durante todo el movimiento'
    ],
    tips: [
      'La posición de pies bajos aumenta la activación de cuádriceps',
      'Mantén la tensión constante en los cuádriceps',
      'No bloquees las rodillas en la parte superior',
      'Siente el trabajo principalmente en la parte frontal de los muslos'
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
  'extensiones + drop': {
    name: 'Extensiones de Cuádriceps + Drop Set',
    description: 'Ejercicio de aislamiento para cuádriceps con técnica de drop set para máxima congestión y detalle muscular.',
    instructions: [
      'Siéntate en la máquina con la espalda apoyada',
      'Coloca los tobillos bajo las almohadillas',
      'Realiza 12-15 repeticiones con el peso seleccionado',
      'Al llegar al fallo o completar las repeticiones, reduce inmediatamente el peso en 20-30%',
      'Sin descanso, continúa realizando repeticiones hasta el fallo con el peso reducido',
      'Opcional: realiza un segundo drop reduciendo el peso nuevamente',
      'Aprieta los cuádriceps en cada repetición',
      'Mantén la técnica correcta incluso cuando estés fatigado'
    ],
    tips: [
      'El drop set maximiza la congestión y el detalle muscular',
      'No descanses entre el peso original y el drop',
      'Mantén el movimiento controlado en ambas fases',
      'Este es un ejercicio de alta intensidad, úsalo al final del entrenamiento',
      'Siente la quema muscular en los cuádriceps'
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
  'zancadas caminando': {
    name: 'Zancadas Caminando',
    description: 'Variante de zancadas realizada caminando hacia adelante, proporcionando mayor rango de movimiento y activación de fibras profundas.',
    instructions: [
      'De pie, sostén mancuernas o barra en los hombros (opcional)',
      'Da un paso largo hacia adelante con una pierna',
      'Baja la rodilla trasera hacia el suelo',
      'Mantén la rodilla delantera sobre el tobillo',
      'Empuja con el talón delantero para avanzar',
      'Sin volver atrás, da el siguiente paso con la otra pierna',
      'Continúa caminando hacia adelante alternando las piernas',
      'Mantén el torso erguido durante todo el movimiento'
    ],
    tips: [
      'Este ejercicio proporciona mayor rango de movimiento que las zancadas estáticas',
      'Activa fibras musculares profundas debido al movimiento continuo',
      'Mantén un ritmo controlado y constante',
      'No dejes que la rodilla delantera se vaya hacia adentro',
      'Usa un espacio largo para realizar todas las repeticiones'
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
  'hip thrust con barra': {
    name: 'Hip Thrust con Barra',
    description: 'Ejercicio Nº1 científicamente para glúteos. Se realiza con barra sobre la cadera, proporcionando máxima activación del glúteo mayor.',
    instructions: [
      'Siéntate en el suelo con la espalda alta apoyada en un banco',
      'Coloca la barra sobre la cadera (usa una almohadilla para comodidad)',
      'Flexiona las rodillas con los pies separados al ancho de los hombros',
      'Mantén los pies firmes en el suelo',
      'Empuja la cadera hacia arriba contrayendo los glúteos',
      'Extiende completamente la cadera en la parte superior',
      'Mantén la contracción máxima en los glúteos en la parte superior',
      'Baja controladamente hasta casi tocar el suelo',
      'Mantén la tensión en los glúteos durante todo el movimiento'
    ],
    tips: [
      'Este es el ejercicio más efectivo científicamente para glúteos',
      'Usa una almohadilla o toalla sobre la cadera para protegerla',
      'Mantén el core activo durante todo el movimiento',
      'No arquees excesivamente la espalda baja',
      'Enfócate en la contracción de los glúteos, no en el peso'
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
  'curl femoral acostado o sentado': {
    name: 'Curl de Femoral Acostado o Sentado',
    description: 'Ejercicio de aislamiento ideal para isquiotibiales. Se puede realizar acostado o sentado en máquina.',
    instructions: [
      'Si usas máquina acostado: acuéstate boca abajo con los talones bajo las almohadillas',
      'Si usas máquina sentado: siéntate con los talones bajo las almohadillas',
      'Mantén la espalda recta y el core activo',
      'Flexiona las rodillas llevando los talones hacia los glúteos',
      'Aprieta los isquiotibiales en la parte superior del movimiento',
      'Mantén la contracción por un momento',
      'Baja controladamente sintiendo el estiramiento',
      'No uses impulso, controla el movimiento en ambas fases'
    ],
    tips: [
      'Este ejercicio aísla perfectamente los isquiotibiales',
      'La posición acostada permite mayor rango de movimiento',
      'La posición sentado puede ser más cómoda para la espalda baja',
      'Mantén el movimiento controlado, no uses impulso',
      'Siente la contracción en la parte posterior del muslo'
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
  'sentadilla búlgara mancuernas': {
    name: 'Sentadilla Búlgara con Mancuernas',
    description: 'Ejercicio unilateral para glúteos y cuádriceps con rango de movimiento profundo. Se realiza con mancuernas y una pierna elevada.',
    instructions: [
      'Sostén mancuernas en cada mano a los lados del cuerpo',
      'Coloca el empeine del pie trasero en un banco o plataforma',
      'Da un paso largo con la pierna delantera',
      'Baja la rodilla trasera hacia el suelo, manteniendo el torso erguido',
      'Baja lo más profundo posible para máximo ROM',
      'Empuja con el talón delantero para volver a la posición inicial',
      'Mantén el peso cerca del cuerpo durante todo el movimiento',
      'Alterna las piernas después de completar las repeticiones'
    ],
    tips: [
      'El ROM profundo es clave para activar glúteos y cuádriceps',
      'Mantén el torso erguido, no te inclines hacia adelante',
      'Siente el estiramiento en la parte frontal del muslo',
      'Este ejercicio es excelente para trabajar glúteos y cuádriceps',
      'Controla el movimiento en ambas fases'
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
  'plancha rkc': {
    name: 'Plancha RKC',
    description: 'Variante avanzada de la plancha (RKC = Russian Kettlebell Challenge) con mayor activación del core y glúteos.',
    instructions: [
      'Colócate en posición de flexión con los antebrazos en el suelo',
      'Mantén el cuerpo en línea recta desde la cabeza hasta los talones',
      'Contrae fuertemente el core, glúteos y cuádriceps simultáneamente',
      'Aprieta los glúteos como si intentaras romper una nuez',
      'Mantén la contracción máxima durante todo el tiempo indicado',
      'Respira de forma controlada sin perder la tensión'
    ],
    tips: [
      'La RKC requiere máxima contracción muscular',
      'No dejes que la cadera se hunda ni se eleve',
      'Mantén la tensión en todo el cuerpo',
      'Es más intensa que la plancha regular'
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
  'remo en polea baja': {
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
  'remo en polea baja (agarre v o neutro)': {
    name: 'Remo en Polea Baja (Agarre V o Neutro)',
    description: 'Ejercicio para el dorsal ancho realizado en polea baja con agarre V o neutro, proporcionando ROM controlado y tensión constante en todo el recorrido.',
    instructions: [
      'Siéntate en la máquina con los pies en la plataforma',
      'Agarra la manija con agarre V (manos en forma de V) o neutro (palmas enfrentadas)',
      'Mantén la espalda recta y el torso ligeramente inclinado hacia atrás',
      'Tira de la manija hacia el abdomen inferior',
      'Mantén la tensión constante durante todo el movimiento',
      'Aprieta los omóplatos y el dorsal ancho al final',
      'Vuelve a la posición inicial controladamente, sintiendo el estiramiento',
      'Mantén el ROM completo en ambas fases del movimiento'
    ],
    tips: [
      'El agarre V o neutro permite mayor rango de movimiento',
      'Mantén la tensión constante en todo el recorrido',
      'No uses impulso, controla el peso en ambas fases',
      'Siente el trabajo en el dorsal ancho y la espalda media',
      'El ROM controlado es clave para la activación muscular'
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
  'press francés barra ez': {
    name: 'Press Francés con Barra EZ',
    description: 'Ejercicio de aislamiento para tríceps que activa principalmente la cabeza larga del tríceps. Se realiza acostado con barra EZ.',
    instructions: [
      'Acuéstate en un banco plano con la cabeza cerca del final',
      'Agarra la barra EZ con las palmas hacia arriba',
      'Extiende los brazos completamente sobre el pecho',
      'Flexiona los codos bajando la barra hacia la frente',
      'Mantén los codos apuntando hacia arriba y juntos',
      'Extiende los brazos volviendo a la posición inicial',
      'Aprieta los tríceps en la parte superior del movimiento'
    ],
    tips: [
      'La barra EZ es más cómoda para las muñecas que la barra recta',
      'Mantén los codos estables, no los dejes abrirse',
      'Baja controladamente hasta sentir el estiramiento en los tríceps',
      'No rebotes la barra en la frente',
      'Enfócate en la contracción de la cabeza larga del tríceps'
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
  'circuito: crunch + elevación piernas + plancha': {
    name: 'Circuito: Crunch + Elevación Piernas + Plancha',
    description: 'Circuito completo de core que combina tres ejercicios fundamentales: crunches para abdomen superior, elevación de piernas para abdomen inferior, y plancha para estabilización.',
    instructions: [
      'Realiza 3 rondas del circuito completo',
      'Ronda 1: Crunches (15-20 repeticiones)',
      'Sin descanso, pasa a: Elevación de piernas (12-15 repeticiones)',
      'Sin descanso, pasa a: Plancha (mantén 30-45 segundos)',
      'Descansa 60-90 segundos entre rondas',
      'Repite el circuito 3 veces en total',
      'Mantén el core activo durante todo el circuito'
    ],
    tips: [
      'No descanses entre ejercicios dentro de la misma ronda',
      'Mantén la técnica correcta en cada ejercicio',
      'Respira de forma constante durante todo el circuito',
      'Si es muy intenso, reduce el tiempo de plancha o el número de repeticiones',
      'Este circuito trabaja todo el core de forma completa'
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
  'elevaciones laterales': {
    name: 'Elevaciones Laterales',
    description: 'Ejercicio de aislamiento para deltoides laterales realizado con mancuernas.',
    instructions: [
      'De pie, agarra mancuernas con los brazos a los lados del cuerpo',
      'Mantén una ligera flexión en los codos',
      'Eleva los brazos lateralmente hasta la altura de los hombros',
      'Mantén las palmas hacia abajo durante todo el movimiento',
      'Baja controladamente sin dejar caer el peso',
      'Evita usar impulso del cuerpo'
    ],
    tips: [
      'No eleves más allá de la altura de los hombros',
      'Mantén el movimiento controlado en ambas fases',
      'Siente la contracción en los deltoides laterales',
      'Puedes hacerlo con ambos brazos simultáneamente o alternando'
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
  'remo en máquina pecho soportado': {
    name: 'Remo en Máquina de Pecho Soportado',
    description: 'Ejercicio para la espalda media realizado en máquina con soporte para el pecho, proporcionando estabilidad y tensión directa sin fatiga lumbar.',
    instructions: [
      'Siéntate en la máquina con el pecho completamente apoyado en el respaldo',
      'Ajusta el respaldo para que el pecho quede cómodamente soportado',
      'Agarra las manijas con las palmas enfrentadas o hacia abajo',
      'Tira de las manijas hacia el pecho, apretando los omóplatos',
      'Mantén la espalda recta y el core activo',
      'Vuelve a la posición inicial controladamente',
      'Siente la tensión directa en la espalda media'
    ],
    tips: [
      'El soporte del pecho elimina la fatiga lumbar',
      'Enfócate en la contracción de la espalda media',
      'Mantén la tensión constante durante todo el movimiento',
      'No uses impulso, controla el peso en ambas fases'
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
  'jalón en polea agarre neutro estrecho': {
    name: 'Jalón en Polea con Agarre Neutro Estrecho',
    description: 'Ejercicio para el dorsal ancho realizado con agarre neutro (palmas enfrentadas) y manos juntas, proporcionando mayor activación del dorsal que el agarre ancho.',
    instructions: [
      'Siéntate en la máquina con los muslos sujetos',
      'Agarra la manija con agarre neutro (palmas enfrentadas)',
      'Coloca las manos juntas (agarre estrecho)',
      'Tira de la manija hacia el pecho superior',
      'Inclínate ligeramente hacia atrás',
      'Aprieta los omóplatos y el dorsal ancho al final del movimiento',
      'Vuelve a la posición inicial controladamente',
      'Siente la contracción en la parte media de la espalda'
    ],
    tips: [
      'El agarre neutro estrecho activa más el dorsal ancho que el agarre ancho',
      'Mantén el torso estable durante todo el movimiento',
      'Enfócate en apretar los omóplatos al final',
      'No uses impulso, controla el movimiento en ambas fases'
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
  'curl en polea': {
    name: 'Curl en Polea',
    description: 'Ejercicio para bíceps realizado en polea baja, proporcionando resistencia constante durante todo el movimiento.',
    instructions: [
      'Ajusta la polea a la altura más baja',
      'De pie frente a la polea',
      'Agarra la barra o manija con las palmas hacia arriba',
      'Mantén los codos pegados al cuerpo',
      'Flexiona los brazos levantando el peso',
      'Aprieta los bíceps en la parte superior',
      'Baja controladamente sintiendo la tensión constante',
      'Mantén la tensión durante todo el movimiento'
    ],
    tips: [
      'La polea proporciona tensión constante en todo el rango de movimiento',
      'Mantén los codos estables, no los dejes moverse hacia adelante',
      'Siente la contracción en los bíceps',
      'Controla el movimiento en ambas fases'
    ]
  },
  'curl en polea de pie (tensión constante)': {
    name: 'Curl en Polea de Pie (Tensión Constante)',
    description: 'El mejor curl metabólico para bíceps. La polea proporciona tensión constante durante todo el movimiento, maximizando la activación muscular.',
    instructions: [
      'Ajusta la polea a la altura más baja',
      'De pie frente a la polea, separado lo suficiente para mantener tensión',
      'Agarra la barra o manija con las palmas hacia arriba',
      'Mantén los codos pegados al cuerpo y ligeramente hacia adelante',
      'Flexiona los brazos levantando el peso, sintiendo la tensión constante',
      'Aprieta los bíceps en la parte superior del movimiento',
      'Baja controladamente, manteniendo la tensión en todo el recorrido',
      'No dejes que el peso descanse completamente en la parte inferior'
    ],
    tips: [
      'La tensión constante es la clave de este ejercicio',
      'Mantén el movimiento controlado en ambas fases',
      'No uses impulso, deja que la polea haga el trabajo',
      'Este es un ejercicio metabólico excelente para bíceps',
      'Siente la contracción constante en los bíceps'
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
  },
  'elevación lateral en polea': {
    name: 'Elevación Lateral en Polea',
    description: 'Ejercicio de aislamiento para deltoides laterales realizado con polea, proporcionando resistencia constante.',
    instructions: [
      'Ajusta la polea a la altura más baja',
      'De pie de lado a la polea, agarra la manija con la mano más alejada',
      'Mantén el brazo ligeramente flexionado',
      'Eleva el brazo lateralmente hasta la altura de los hombros',
      'Mantén el movimiento controlado y sin impulso',
      'Baja controladamente hasta la posición inicial',
      'Repite con el otro brazo'
    ],
    tips: [
      'Mantén el cuerpo recto, no te inclines hacia el lado',
      'Siente la contracción en el deltoides lateral',
      'No uses peso excesivo, prioriza la forma correcta'
    ]
  },
  'elevación lateral mancuerna': {
    name: 'Elevación Lateral con Mancuerna',
    description: 'Ejercicio clásico de aislamiento para deltoides laterales realizado con mancuernas.',
    instructions: [
      'De pie, agarra mancuernas con los brazos a los lados del cuerpo',
      'Mantén una ligera flexión en los codos',
      'Eleva los brazos lateralmente hasta la altura de los hombros',
      'Mantén las palmas hacia abajo durante todo el movimiento',
      'Baja controladamente sin dejar caer el peso',
      'Evita usar impulso del cuerpo'
    ],
    tips: [
      'No eleves más allá de la altura de los hombros',
      'Mantén el movimiento controlado en ambas fases',
      'Siente la contracción en los deltoides laterales',
      'Puedes hacerlo con ambos brazos simultáneamente o alternando'
    ]
  },
  'reverse fly máquina/polea': {
    name: 'Reverse Fly en Máquina/Polea',
    description: 'Ejercicio para deltoides posteriores y romboides realizado en máquina de peck deck o polea.',
    instructions: [
      'Si usas máquina: siéntate con el pecho apoyado en el respaldo',
      'Si usas polea: ajusta las poleas a la altura de los hombros',
      'Agarra las manijas con los brazos extendidos frente al pecho',
      'Abre los brazos en un arco hacia atrás',
      'Aprieta los deltoides posteriores y omóplatos al final del movimiento',
      'Vuelve a la posición inicial controladamente',
      'Mantén una ligera flexión en los codos durante todo el movimiento'
    ],
    tips: [
      'Enfócate en apretar los omóplatos al final del movimiento',
      'No uses peso excesivo, prioriza el rango de movimiento completo',
      'Mantén el pecho alto y la espalda recta',
      'Siente la contracción en la parte posterior de los hombros'
    ]
  },
  'reverse fly en máquina o polea': {
    name: 'Reverse Fly en Máquina o Polea',
    description: 'Ejercicio de aislamiento para deltoides posteriores que mejora la estética y postura. Se realiza en máquina o polea.',
    instructions: [
      'Si usas máquina: siéntate con el pecho apoyado en el respaldo',
      'Si usas polea: ajusta las poleas a la altura de los hombros',
      'Agarra las manijas con los brazos extendidos frente al pecho',
      'Abre los brazos en un arco hacia atrás',
      'Aprieta los deltoides posteriores y omóplatos al final del movimiento',
      'Vuelve a la posición inicial controladamente',
      'Mantén una ligera flexión en los codos durante todo el movimiento'
    ],
    tips: [
      'Este ejercicio aísla perfectamente el deltoide posterior',
      'Mejora la postura y la estética de los hombros',
      'No uses peso excesivo, prioriza el rango de movimiento completo',
      'Mantén el pecho alto y la espalda recta',
      'Siente la contracción en la parte posterior de los hombros'
    ]
  },
  'back extension (45° o horizontal)': {
    name: 'Back Extension (45° o Horizontal)',
    description: 'Ejercicio para glúteos e isquiotibiales que proporciona alto estiramiento y activación conjunta. Se realiza en máquina de hiperextensión.',
    instructions: [
      'Ajusta la máquina de hiperextensión a 45 grados o horizontal',
      'Coloca los muslos en las almohadillas y los pies en la plataforma',
      'Cruza los brazos sobre el pecho o coloca las manos detrás de la cabeza',
      'Baja el torso flexionando la cadera',
      'Baja hasta sentir el estiramiento en los isquiotibiales y glúteos',
      'Extiende la cadera contrayendo los glúteos e isquiotibiales',
      'Lleva el torso hasta la posición horizontal o ligeramente por encima',
      'Mantén la contracción en la parte superior',
      'Vuelve a la posición inicial controladamente'
    ],
    tips: [
      'Este ejercicio proporciona alto estiramiento y activación conjunta',
      'No hiperextiendas la espalda baja, enfócate en la cadera',
      'Siente el trabajo en glúteos e isquiotibiales',
      'Mantén el movimiento controlado en ambas fases',
      'Puedes agregar peso sosteniendo una placa o disco en el pecho'
    ]
  },
  'gemelo sentado o en máquina': {
    name: 'Gemelo Sentado o en Máquina',
    description: 'Ejercicio para los músculos de la pantorrilla (sóleo y gemelo) realizado sentado, proporcionando estímulo completo del tren inferior.',
    instructions: [
      'Si usas máquina: siéntate en la máquina de gemelos sentado',
      'Si usas peso libre: siéntate en un banco con mancuernas en los muslos',
      'Coloca las puntas de los pies en la plataforma o en un bloque',
      'Baja los talones lo máximo posible sintiendo el estiramiento',
      'Eleva los talones contrayendo los gemelos y sóleo',
      'Mantén la contracción máxima en la parte superior',
      'Baja controladamente hasta el estiramiento completo',
      'Mantén las rodillas flexionadas durante todo el movimiento'
    ],
    tips: [
      'La posición sentada trabaja principalmente el sóleo',
      'Mantén el movimiento completo en ambas fases',
      'No uses impulso, controla el peso',
      'Este ejercicio complementa las elevaciones de pie',
      'Siente la contracción en toda la pantorrilla'
    ]
  }
};

