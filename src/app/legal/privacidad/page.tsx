import React from 'react';
import LegalTemplate from '@/shared/components/templates/LegalTemplate';
import { Lock } from 'lucide-react';

export default function Privacidad() {
    return (
        <LegalTemplate 
            title="Privacidad" 
            icon={<Lock className="w-8 h-8 text-status-gold" />}
        >
            <div className="space-y-8">
                <section>
                    <h2 className="text-2xl font-black text-status-teal border-b-2 border-status-gold pb-2 uppercase tracking-widest">Base Legal</h2>
                    <p className="mt-4">
                        Conforme a la <strong>Ley Orgánica de Protección de Datos Personales (LOPDP)</strong> de la República del Ecuador, Karen Herrera Ruiz (en adelante, el "Responsable") garantiza el tratamiento de sus datos personales bajo los principios de licitud, transparencia, finalidad y seguridad.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-black text-status-teal border-b-2 border-status-gold pb-2 uppercase tracking-widest">Tratamiento y Finalidad</h2>
                    <p className="mt-4">
                        Los datos recabados a través del formulario de contacto y herramientas analíticas se utilizarán para:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4 text-status-goldText font-bold">
                        <li>Gestión de consultas profesionales y académicas.</li>
                        <li>Análisis de tráfico mediante cookies de Google Analytics (GA4).</li>
                        <li>Mejora de la experiencia de usuario y optimización de marca personal.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-black text-status-teal border-b-2 border-status-gold pb-2 uppercase tracking-widest">Derechos ARCO (Ecuador)</h2>
                    <p className="mt-4 text-status-teal">
                        Usted tiene derecho a ejercer sus derechos de:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4 text-status-goldText font-bold">
                        <li>Acceso, Rectificación y Actualización.</li>
                        <li>Eliminación, Oposición y Portabilidad.</li>
                        <li>Suspensión del tratamiento.</li>
                    </ul>
                    <p className="mt-4">
                        Para ejercer estos derechos, puede enviar una solicitud a: <strong>kherrerar3@unemi.edu.ec</strong>.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-black text-status-teal border-b-2 border-status-gold pb-2 uppercase tracking-widest">Almacenamiento y Seguridad</h2>
                    <p className="mt-4">
                        Sus datos se almacenan en servidores seguros y no se ceden a terceros, salvo por obligaciones legales o para el funcionamiento técnico (como Netlify).
                    </p>
                </section>
            </div>
        </LegalTemplate>
    );
}
