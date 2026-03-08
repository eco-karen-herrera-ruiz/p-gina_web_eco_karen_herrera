import React from 'react';
import LegalTemplate from '@/shared/components/templates/LegalTemplate';
import { Scale } from 'lucide-react';

export default function AvisoLegal() {
    return (
        <LegalTemplate 
            title="Aviso Legal" 
            icon={<Scale className="w-8 h-8 text-status-gold" />}
        >
            <div className="space-y-8">
                <section>
                    <h2 className="text-2xl font-black text-status-teal border-b-2 border-status-gold pb-2 uppercase tracking-widest">Información del Responsable</h2>
                    <p className="mt-4">
                        En cumplimiento con lo dispuesto en la <strong>Ley Orgánica de Protección de Datos Personales (LOPDP)</strong> de la República del Ecuador, se informa que la responsable de este sitio web es:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4 text-status-goldText font-bold">
                        <li>Titular: <strong>Karen Dayanna Herrera Ruiz</strong></li>
                        <li>Afiliación: Estudiante de Economía - UNEMI</li>
                        <li>Correo: kherrerar3@unemi.edu.ec</li>
                        <li>WhatsApp: +593 95 947 8356</li>
                        <li>Ubicación: Milagro, Guayas, Ecuador.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-black text-status-teal border-b-2 border-status-gold pb-2 uppercase tracking-widest">Objeto y Uso</h2>
                    <p className="mt-4">
                        Este sitio web tiene como finalidad la difusión de contenido económico, académico y la gestión de marca personal. El acceso y uso de este portal atribuye la condición de usuario, implicando la aceptación plena de las disposiciones incluidas en este Aviso Legal.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-black text-status-teal border-b-2 border-status-gold pb-2 uppercase tracking-widest">Transformación Digital</h2>
                    <p className="mt-4">
                        Bajo el amparo de la <strong>Ley Orgánica para la Transformación Digital y Audiovisual</strong>, este espacio promueve la digitalización de servicios profesionales y académicos, asegurando la integridad, disponibilidad y confidencialidad de la información gestionada a través de medios electrónicos.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-black text-status-teal border-b-2 border-status-gold pb-2 uppercase tracking-widest">Propiedad Intelectual</h2>
                    <p className="mt-4">
                        Todos los contenidos (textos, gráficos, logos e imágenes) son propiedad de Karen Herrera Ruiz o de sus licenciantes, protegidos por el Código Orgánico de la Economía Social de los Conocimientos, Creatividad e Innovación (Ingenios).
                    </p>
                </section>
            </div>
        </LegalTemplate>
    );
}
