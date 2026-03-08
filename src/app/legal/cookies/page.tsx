import React from 'react';
import LegalTemplate from '@/shared/components/templates/LegalTemplate';
import { FileText } from 'lucide-react';

export default function Cookies() {
    return (
        <LegalTemplate 
            title="Cookies" 
            icon={<FileText className="w-8 h-8 text-status-gold" />}
        >
            <div className="space-y-8">
                <section>
                    <h2 className="text-2xl font-black text-status-teal border-b-2 border-status-gold pb-2 uppercase tracking-widest">¿Qué son las Cookies?</h2>
                    <p className="mt-4">
                        Este portal utiliza cookies para optimizar la experiencia de navegación del usuario. En cumplimiento con la <strong>Ley Orgánica de Protección de Datos Personales (LOPDP)</strong> de la República del Ecuador, le informamos sobre el uso de estas herramientas técnicas.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-black text-status-teal border-b-2 border-status-gold pb-2 uppercase tracking-widest">Tipos de Cookies Utilizadas</h2>
                    <p className="mt-4">
                        Nuestra web emplea las siguientes clases de cookies:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4 text-status-goldText font-bold">
                        <li><strong>Cookies Técnicas (Esenciales):</strong> Necesarias para el funcionamiento del portal y para recordar su preferencia de privacidad (Aceptar/Rechazar banner).</li>
                        <li><strong>Cookies de Análisis (Opcionales):</strong> Utilizamos Google Analytics (GA4) para recopilar datos anónimos de tráfico, con el fin de mejorar nuestro contenido profesional.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-black text-status-teal border-b-2 border-status-gold pb-2 uppercase tracking-widest">Gestión y Desactivación</h2>
                    <p className="mt-4">
                        Usted puede modificar la configuración de cookies desde su navegador o revocar su consentimiento eliminando las cookies del historial de navegación.
                    </p>
                    <p className="mt-4 italic">
                        El bloqueo de cookies técnicas podría afectar el correcto funcionamiento de ciertas secciones del sitio.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-black text-status-teal border-b-2 border-status-gold pb-2 uppercase tracking-widest">Consentimiento LOPDP</h2>
                    <p className="mt-4">
                        Al navegar por nuestro portal y aceptar el banner de cookies, usted otorga su consentimiento libre, previo e informado para el tratamiento de estos datos bajo los fines académicos y profesionales aquí descritos.
                    </p>
                </section>
            </div>
        </LegalTemplate>
    );
}
