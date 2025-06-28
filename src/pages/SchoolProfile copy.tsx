import SchoolBanner from "@/components/SchoolBanner";
import PhotoGallery from "@/components/PhotoGallery";
import InfoSection from "@/components/InfoSection";
import ReviewsSection from "@/components/ReviewsSection copy";
import StarRating from "@/components/StarRating";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Phone, 
  MapPin, 
  Clock, 
  Users, 
  BookOpen, 
  Award, 
  Globe, 
  Heart, 
  GraduationCap, 
  UserCheck,
  Brain,
  Dumbbell,
  Zap
} from "lucide-react";

const SchoolProfile = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Photo Gallery */}
        <PhotoGallery />

        {/* School Banner - no spacing above */}
        <SchoolBanner />

        {/* Rest of content with spacing */}
        <div className="p-6 space-y-8">
          {/* Contact Information */}
          <InfoSection title="Información de Contacto" icon={Phone}>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-lg mb-2">Contacto</h3>
                <div className="space-y-2">
                  <p>📞 <a href="tel:+56987088718" className="text-blue-600 hover:text-blue-800 underline">+56 9 87088718</a></p>
                  <p>✉️ <a href="mailto:secretariadireccion@colegioalbamar.cl" className="text-blue-600 hover:text-blue-800 underline">secretariadireccion@colegioalbamar.cl</a></p>
                  <p>🌐 www.colegioalbamar.cl</p>
                </div>
              </div>
              <div>
                <p><strong>Dirección:</strong> Camino El Alba 12357, Las Condes, Santiago</p>
                <p><strong>Horario de Atención:</strong> Lunes a Viernes, 8:00 - 17:00 hrs</p>
              </div>
            </div>
          </InfoSection>

          {/* General Description */}
          <InfoSection title="Descripción General" icon={BookOpen}>
            <div className="space-y-7">
              <div>
                <h3 className="font-bold text-lg mb-2"><strong>Misión</strong></h3>
                <p>Formar mujeres cristianas líderes, capaces de influir positivamente en la sociedad y contribuir a la solución de los desafíos de su tiempo, con respeto a la libertad y llevando el testimonio de Cristo en sus acciones.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2"><strong>¿Cómo se logra?</strong></h3>
                <p>Se ofrece una educación integral que abarca lo académico, lo personal y lo espiritual, inspirada en la visión cristiana de la mujer y con una formación personalizada que se adapta a los ritmos y necesidades de cada alumna, reconociendo siempre a los padres como los primeros educadores.</p>
              </div>
            </div>
          </InfoSection>

          {/* Admission Process */}
          <InfoSection title="Proceso de Admisión" icon={Users}>
            <div className="space-y-9">
              <div>
                <h3 className="font-bold text-lg mb-3">Fechas de postulación</h3>
                <ul className="space-y-2">
                  <li><strong>• Playgroup a 6to Básico:</strong> Del 1 de abril al 27 de mayo (o hasta agotar vacantes)</li>
                  <li><strong>• Desde 7mo Básico:</strong> Desde Agosto</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-3">Detalles del proceso</h3>
                <ul className="space-y-3">
                  <li><strong>• Entrevista:</strong> Si la postulante aprueba el examen, se agenda una entrevista con la directora</li>
                  <li><strong>• Padres:</strong> La participación de ambos padres es obligatoria a lo largo del proceso y se espera que estén familiarizados con el proyecto educativo</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-3">Costo</h3>
                <ul className="space-y-2">
                  <li>• Tarifa de <strong>1 UF por familia</strong>, se paga al ser contactados por el colegio</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-3">Resultados</h3>
                <p>• Son comunicados por teléfono o correo <strong>máximo 3 semanas</strong> desde la entrega de la documentación.</p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-3">Links de interés</h3>
                <ul className="space-y-2">
                  <li>• <a href="/temarios-admision" className="text-blue-600 hover:underline">Temarios de Exámenes de Admisión</a></li>
                  <li>• <a href="/fechasYVacantes" className="text-blue-600 hover:underline">Fechas y vacantes 2026</a></li>
                </ul>
              </div>
            </div>
          </InfoSection>

          {/* Cost Information */}
          <InfoSection title="Información de Costos" icon={Award}>
            <div className="space-y-9">
              <div>
                <h3 className="font-bold text-lg mb-3">Matrícula</h3>
                
                <Table className="mb-4">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ítem</TableHead>
                      <TableHead>Curso</TableHead>
                      <TableHead>Valor (UF)</TableHead>
                      <TableHead>Valor (CLP)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell rowSpan={3} className="font-medium align-center">Matrícula</TableCell>
                      <TableCell>Playgroup</TableCell>
                      <TableCell>6,6</TableCell>
                      <TableCell>$256.998</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Prekinder y Kinder</TableCell>
                      <TableCell>10,6</TableCell>
                      <TableCell>$389.392</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Básica y Media</TableCell>
                      <TableCell>15</TableCell>
                      <TableCell>$584.088</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <ul className="space-y-3 mt-3">
                  <li><strong>• Tipo de pago:</strong> Anual y se hace a principios de año</li>
                  <li><strong>• Tope máximo:</strong> Por familia son <strong>45 UF</strong> (aproximadamente <strong>$1.752.264</strong>)</li>
                </ul>
              </div>
            
              <div>
                <h3 className="font-bold text-lg mb-3">Colegiatura</h3>
                
                <Table className="mb-4">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ítem</TableHead>
                      <TableHead>Curso</TableHead>
                      <TableHead>Valor (UF)</TableHead>
                      <TableHead>Valor (CLP)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell rowSpan={3} className="font-medium align-center">Sin jornada extendida</TableCell>
                      <TableCell>Playgroup</TableCell>
                      <TableCell>6,6</TableCell>
                      <TableCell>$256.998</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Prekinder y Kinder</TableCell>
                      <TableCell>10,6</TableCell>
                      <TableCell>$389.392</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Básica y Media</TableCell>
                      <TableCell>15</TableCell>
                      <TableCell>$584.088</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell rowSpan={3} className="font-medium align-top">Con jornada extendida</TableCell>
                      <TableCell>Playgroup</TableCell>
                      <TableCell>9,6</TableCell>
                      <TableCell>$373.816</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Prekinder y Kinder</TableCell>
                      <TableCell>13,6</TableCell>
                      <TableCell>$529.573</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Básica y Media</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>-</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <ul className="space-y-3 mt-3">
                  <li>• <strong>Tipo de pago:</strong> 10 cuotas mensuales</li>
                  <li>• La colegiatura (ambas opciones) <strong>incluye</strong>:</li>
                  <ul className="ml-6 space-y-1">
                    <li>• <strong>Seguro de accidentes del alumno:</strong> Cobertura de <strong>50 UF</strong> las <strong>24 hrs</strong> del día</li>
                    <li>• <strong>Seguro de escolaridad:</strong> Cobertura de <strong>120 UF anuales</strong> en caso de fallecimiento o invalidez total del apoderado sostenedor</li>
                  </ul>
                  
                </ul>
              </div>
            
              <div>
                <h3 className="font-bold text-lg mb-3">Bono de incorporación</h3>
                
                <Table className="mb-4">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ítem</TableHead>
                      <TableHead>Valor 1º Hijo</TableHead>
                      <TableHead>Valor 2º Hijo</TableHead>
                      <TableHead>Valor 3º Hijo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Bono Incorporación por hijo</TableCell>
                      <TableCell>45 UF o $1.752.264*1</TableCell>
                      <TableCell>30 UF o $1.168.176*1</TableCell>
                      <TableCell>15 UF o $584.088</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <ul className="space-y-2">
                  <li>• <strong>Tipo de pago:</strong> <strong>Único</strong> y se hace al ingresar al colegio</li>
                  <li>• <strong>Tope máximo:</strong> <strong>90 UF</strong> (aproximadamente <strong>$3.504.528</strong>)</li>
                </ul>
              </div>
            </div>
          </InfoSection>

          {/* Educational Project */}
          <InfoSection title="Principios educativos" icon={GraduationCap}>
            <div className="grid md:grid-cols-2 gap-6">
              <ul className="space-y-5">
                <li className="mt-6"><strong>• Desarrollo de la inteligencia:</strong> Enseñar a pensar y aprender</li>
                <li><strong>• Educación de la voluntad:</strong> Enseñar a buscar la verdad y el bien</li>
                <li><strong>• Educación espiritual:</strong> Basada en las enseñanzas del Magisterio de la Iglesia Católica</li>
                <li><strong>• Educación en el amor humano:</strong> Promover la entrega generosa a los demás</li>
                </ul>
                <ul className="space-y-5 self-center">
                <li><strong>• Preparación para el trabajo:</strong> Valorar el estudio bien hecho y el espíritu de servicio</li>
                <li><strong>• Enseñar a vivir y a convivir:</strong> Cultivar valores, virtudes y habilidades interpersonales</li>
                <li><strong>• Desarrollo físico y deportivo:</strong> Fomentar la sana competencia, la fortaleza y la constancia</li>
              </ul>
            </div>
          </InfoSection>

          {/* Educational Project */}
          <InfoSection title="Proyecto Educativo" icon={GraduationCap}>
            <div className="space-y-9">
              <div>
                <h3 className="font-bold text-lg mb-3">Educación Preescolar</h3>
                <p className="mb-5">El Preescolar Albamar – Montemar se lleva a cabo en conjunto con el Colegio Montemar y funciona en las instalaciones del Colegio Albamar. Los cursos son mixtos y abarcan desde Playgroup hasta Kínder.</p>
                <p className="mb-5">Con el fin de promover un aprendizaje temprano significativo, el preescolar utiliza la metodología PEIS, un enfoque dinámico, atractivo y personalizado que busca desarrollar al máximo las capacidades individuales de cada niño. Las principales características de esta metodología son:</p>
                <ul className="space-y-4 ml-4">
                  <li><strong>• Desarrollo integral:</strong> Despierta el interés por las letras, los números, el inglés, el arte, la música, el juego y el deporte</li>
                  <li><strong>• Aprendizaje activo:</strong> Las clases en ambiente acogedor y alegre que favorece el aprendizaje, promoviendo la autonomía, responsabilidad y madurez</li>
                  <li><strong>• Protagonismo:</strong> Cada niño es gestor de su propio aprendizaje, promoviendo su curiosidad y creatividad, por lo que se respeta sus ritmos, intereses, habilidades y destrezas</li>
                  <li><strong>• Desarrollo a través de experiencias:</strong> Se fomenta la imaginación a través de experiencias lúdicas, motivadoras y significativas</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-3">Educación Básica y Media</h3>
                <p>Se dispone de planes y programas propios que se complementan con la malla curricular propuesta por el Ministerio de Educación. Estos componentes son descritos en los puntos que vienen a continuación.</p>
              </div>
            </div>
          </InfoSection>

          {/* Languages */}
          <InfoSection title="Idiomas" icon={Globe}>
            <div className="space-y-5">
              <h3 className="font-bold text-lg mb-3">Inglés</h3>
              <p className="mb-4">Se enseña a través del enfoque comunicativo, un método que prioriza la comunicación y el uso del idioma en situaciones prácticas y significativas. Este enfoque busca desarrollar las cuatro habilidades lingüísticas —leer, escribir, escuchar y hablar— al mismo tiempo que fomenta el pensamiento crítico.</p>
              
              <ul className="space-y-4 ml-4">
                <li><strong>• Preescolar:</strong> Introducción al bilingüismo con rutinas diarias en inglés, como saludos y rezos. Además, asignaturas como Ciencias, Matemáticas, Música, Arte y Fónica se imparten en inglés. Cada clase cuenta con al menos una educadora bilingüe.</li>
                <li><strong>• 1ero a 4to básico:</strong> 8 horas semanales de inglés. Asignaturas como Ciencias, Historia (hasta 3° básico) y Arte se imparten en inglés.</li>
                <li><strong>• 5to a 8vo básico:</strong> 7 horas semanales de inglés, con clases organizadas en grupos personalizados según el nivel de las alumnas.</li>
              </ul>
              
              <p className="mt-4">Para certificar el aprendizaje, las alumnas rinden exámenes de Cambridge, para obtener el <strong>First Certificate in English (FCE)</strong> en III Medio.</p>
            </div>
          </InfoSection>

          {/* Sports */}
          <InfoSection title="Deporte" icon={Dumbbell}>
            <div className="space-y-4">
              <ul className="space-y-4 mt-6 ml-4">
                <li><strong>• Deporte en preescolar:</strong> 1 hora diaria de actividad física, con circuitos neuromotores y actividades deportivos adaptados a su edad.</li>
                <li><strong>• Deporte desde primero básico:</strong> 4 horas semanales de actividad física, que incluyen educación física y la práctica de deportes como hockey, atletismo, vóleibol y gimnasia artística.</li>
                <li><strong>• Selecciones deportivas:</strong> Algunas disciplinas cuentan con selecciones deportivas en las que las alumnas pueden participar como actividad extraprogramática.</li>
              </ul>
            </div>
          </InfoSection>

          {/* Psychological Support */}
          <InfoSection title="Apoyo Psicológico" icon={Brain}>
            <div className="space-y-4">
              <p className="mb-4">El colegio cuenta con un sistema de tutorías personalizadas, diseñado para acompañar a las alumnas en su desarrollo académico y personal:</p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">¿Qué es?</h4>
                  <p>Cada alumna, desde 5° básico hasta IV Medio, elige a una profesora del colegio como su tutora. Ella la orientará y guiará de manera individualizada en aspectos académicos y personales.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Objetivo del sistema</h4>
                  <p>Potenciar el rendimiento académico, organizar el estudio y mejorar la relación con la familia y los amigos. Además, busca fomentar el desarrollo de virtudes como el carácter y la personalidad, fortaleciendo el autoconocimiento, el uso responsable de la libertad y el esfuerzo por alcanzar metas académicas y personales.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Padres</h4>
                  <p>Las tutoras mantienen reuniones periódicas con los padres para alinear objetivos y trabajar en conjunto en la formación integral de cada alumna.</p>
                </div>
              </div>
            </div>
          </InfoSection>

          {/* Religion */}
          <InfoSection title="Religión" icon={Heart}>
            <div>
              <p>Formación católica centrada en la <strong>búsqueda de la santidad en la vida cotidiana</strong>, con <strong>capellanía a cargo de la Prelatura del Opus Dei</strong>. Se promueve el <strong>amor por el conocimiento</strong>, la <strong>dedicación al estudio</strong>, la <strong>caridad</strong>, el <strong>servicio</strong>, el <strong>respeto</strong> y la <strong>piedad</strong> como pilares fundamentales de la formación espiritual.</p>
            </div>
          </InfoSection>

          {/* University Admission Process */}
          <InfoSection title="Proceso de admisión universitaria" icon={Award}>
            <div className="space-y-4">
              <Table className="mb-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>Año</TableHead>
                    <TableHead>Promedio Notas</TableHead>
                    <TableHead>Lenguaje</TableHead>
                    <TableHead>Matemáticas</TableHead>
                    <TableHead>Matemáticas 2</TableHead>
                    <TableHead>Historia</TableHead>
                    <TableHead>Ciencias</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">2018</TableCell>
                    <TableCell>6.5</TableCell>
                    <TableCell>687</TableCell>
                    <TableCell>692</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>665</TableCell>
                    <TableCell>718</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">2019</TableCell>
                    <TableCell>6.37</TableCell>
                    <TableCell>649</TableCell>
                    <TableCell>650</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>647</TableCell>
                    <TableCell>658</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">2020</TableCell>
                    <TableCell>6.44</TableCell>
                    <TableCell>645</TableCell>
                    <TableCell>654</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>726</TableCell>
                    <TableCell>642</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">2021</TableCell>
                    <TableCell>6.31</TableCell>
                    <TableCell>602</TableCell>
                    <TableCell>614</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>633</TableCell>
                    <TableCell>604</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">2022</TableCell>
                    <TableCell>6.46</TableCell>
                    <TableCell>615</TableCell>
                    <TableCell>638</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>640</TableCell>
                    <TableCell>656</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">2023</TableCell>
                    <TableCell>6.39</TableCell>
                    <TableCell>801</TableCell>
                    <TableCell>784</TableCell>
                    <TableCell>605</TableCell>
                    <TableCell>724</TableCell>
                    <TableCell>701</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">2024</TableCell>
                    <TableCell>6.49</TableCell>
                    <TableCell>764</TableCell>
                    <TableCell>829</TableCell>
                    <TableCell>595</TableCell>
                    <TableCell>689</TableCell>
                    <TableCell>716</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">2025</TableCell>
                    <TableCell>6.46</TableCell>
                    <TableCell>744</TableCell>
                    <TableCell>835</TableCell>
                    <TableCell>564</TableCell>
                    <TableCell>689</TableCell>
                    <TableCell>688</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <div>
                <ul className="space-y-2">
                  <li>• Puntaje promedio Lenguaje: <strong>95 a nivel nacional</strong>, <strong>6<sup>to</sup> a nivel regional</strong></li>
                  <li>• Puntaje promedio Matemáticas: <strong>4<sup>to</sup> a nivel regional</strong></li>
                  <li>• Puntaje promedio total: <strong>85 a nivel nacional</strong>, <strong>4<sup>to</sup> a nivel regional</strong></li>
                </ul>
              </div>
              <div>
                <p className="text-sm text-gray-600 mt-4">
                  <sup>1</sup> Rankings basados en resultados oficiales del DEMRE para establecimientos de la Región Metropolitana.
                </p>
              </div>
            </div>
          </InfoSection>

          {/* Parents */}
          <InfoSection title="Padres" icon={UserCheck}>
            <div className="space-y-4">
              <p className="mb-4">El colegio ofrece recursos y programas para apoyar a los padres en la educación de sus hijas:</p>
              
              <ul className="space-y-3">
                <li><strong>• Cursos:</strong> Se imparten dos cursos anuales, que incluyen charlas y reuniones para analizar casos prácticos relacionados con la educación de sus hijos</li>
                <li><strong>• Biblioteca:</strong> Una colección de libros y videos sobre temas educativos y familiares, disponible para apoyar a los padres en su labor</li>
                <li><strong>• Enlaces de interés:</strong> Una selección de páginas web con material actualizado sobre educación, familia y formación</li>
              </ul>
              
              <p className="mt-4">Además, el colegio organiza conferencias y entrevistas personalizadas con las profesoras jefes, con el fin de fortalecer la colaboración entre el colegio y las familias en el proceso educativo.</p>
            </div>
          </InfoSection>

          {/* Extracurricular Activities */}
          <InfoSection title="Actividades Extraprogramáticas Referenciales" icon={Zap}>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-bold text-lg mb-4 text-blue-600 border-b border-blue-200 pb-2">Deportes</h3>
                <div className="bg-blue-50 rounded-lg p-4">
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      Hockey
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      Atletismo
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      Gimnasia artística
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      Vóleibol
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      Ajedrez
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-bold text-lg mb-4 text-purple-600 border-b border-purple-200 pb-2">Arte y cultura</h3>
                <div className="bg-purple-50 rounded-lg p-4">
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      Violín
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      Fotografía
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      Costura y textil
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      Bandas
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      Teatro
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </InfoSection>

          {/* Reviews Section */}
          <ReviewsSection />

          {/* Rating Summary */}
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <h3 className="text-xl font-semibold mb-4">Calificación Promedio</h3>
            <div className="flex items-center justify-center gap-4">
              <StarRating rating={5} size="lg" />
              <span className="text-3xl font-bold text-gray-900">5.0</span>
              <span className="text-gray-500">(142 reseñas)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolProfile;
