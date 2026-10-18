import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

const journeyData = [
  {
    id: 1,
    yearPt: 'JUN. 2026 - ATUALMENTE',
    yearEn: 'JUN 2026 - PRESENT',
    badgePt: 'Atuação Atual · Tempo Integral',
    badgeEn: 'Current Role · Full-Time',
    rolePt: 'Analista de Sistemas',
    roleEn: 'Systems Analyst',
    company: 'Colégio São Paulo da Cruz',
    descriptionPt:
      'Responsável pela gestão técnica de TI e pelo desenvolvimento de aplicações internas para solucionar gargalos operacionais diários dos colaboradores. Implementei automações de processos via scripts, Make e Node-RED, além de administrar servidores (Windows Server e Linux) e políticas de Firewall, garantindo segurança, alta disponibilidade e redução de 30% nos chamados técnicos.',
    descriptionEn:
      'Responsible for IT technical management and developing internal applications to solve daily operational bottlenecks for staff. Implemented workflow automations via scripts, Make, and Node-RED, while administering servers (Windows Server & Linux) and Firewall policies, ensuring security, high availability, and a 30% reduction in support tickets.',
    tech: [
      'Desenvolvimento de Sistemas Internos',
      'Automação (Make / Node-RED / Scripts)',
      'Windows Server & Linux',
      'Firewall & Segurança de Rede',
    ],
  },
  {
    id: 2,
    yearPt: 'FEV. 2025 - JUN. 2026',
    yearEn: 'FEB 2025 - JUN 2026',
    badgePt: 'Infraestrutura & Software em Produção',
    badgeEn: 'Infrastructure & Production Software',
    rolePt: 'Técnico de Informática',
    roleEn: 'IT Technician',
    company: 'Colégio São Paulo da Cruz',
    descriptionPt:
      'Idealizei e desenvolvi o Portal Educacional CSPC em React com arquitetura JSON dinâmica para os laboratórios de informática. Atuei na manutenção preventiva de hardware, suporte técnico a usuários, configuração de redes cabeadas e Wi-Fi e garantia de estabilidade dos sistemas corporativos e acadêmicos.',
    descriptionEn:
      'Designed and built the CSPC Educational Portal in React with a dynamic JSON architecture for computer labs. Handled preventive hardware maintenance, user technical support, wired/Wi-Fi network configuration, and stability of corporate and academic systems.',
    tech: ['React', 'Portal CSPC em Produção', 'Windows Server', 'Redes & Wi-Fi', 'Linux', 'Hardware'],
  },
  {
    id: 3,
    yearPt: 'JUL. 2025 - DEZ. 2025',
    yearEn: 'JUL 2025 - DEC 2025',
    badgePt: 'Mentoria Acadêmica · Front-End',
    badgeEn: 'Academic Mentorship · Front-End',
    rolePt: 'Monitor de Desenvolvimento de Interfaces Web',
    roleEn: 'Web Interface Development Teaching Assistant',
    company: 'PUC Minas',
    descriptionPt:
      'Responsável por elaborar atividades práticas, conduzir plantões de dúvidas presenciais e online e auxiliar os professores na revisão de código e projetos de desenvolvimento Front-End dos alunos de graduação.',
    descriptionEn:
      'Responsible for designing practical assignments, leading in-person and online tutoring sessions, and assisting professors with code reviews and Front-End web development projects for undergraduate students.',
    tech: ['HTML5 & CSS3', 'JavaScript', 'React', 'Mentoria Técnica', 'Comunicação', 'Resolução de Problemas'],
  },
  {
    id: 4,
    yearPt: 'PREVISÃO: JUNHO 2028',
    yearEn: 'EXPECTED: JUNE 2028',
    badgePt: 'Graduação · Bacharelado',
    badgeEn: 'Undergraduate · B.S.',
    rolePt: 'Engenharia de Software',
    roleEn: 'B.S. in Software Engineering',
    company: 'PUC Minas · Belo Horizonte, MG',
    descriptionPt:
      'Formação focada em arquitetura de sistemas escaláveis, desenvolvimento Full Stack moderno, Engenharia de Requisitos, Programação Orientada a Objetos (Java / C#), modelagem de bancos de dados relacionais (PostgreSQL), concorrência (Go) e boas práticas de qualidade de software.',
    descriptionEn:
      'Degree focused on scalable systems architecture, modern Full Stack development, Requirements Engineering, Object-Oriented Programming (Java / C#), relational database modeling (PostgreSQL), concurrency (Go), and software quality best practices.',
    tech: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Java (POO)', 'C#', 'PostgreSQL', 'Go'],
  },
];

export default function JourneySection() {
  const { lang } = useLanguage();
  // Primeiro item já aberto por padrão para facilitar a leitura rápida do recrutador
  const [expandedIndex, setExpandedIndex] = useState(0);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section
      id="experiencias"
      className="relative z-10 w-full py-20 md:py-28 px-4 sm:px-8 bg-transparent flex flex-col pointer-events-auto border-t border-dashed border-white/[0.1]"
    >
      <div className="max-w-[1280px] mx-auto w-full p-8 sm:p-12 lg:p-14 border border-dashed border-white/[0.14] bg-[#0d0e13] relative z-10">
        {/* Tag ASCII minimalista */}
        <div className="flex items-center justify-between mb-8 font-['JetBrains_Mono'] text-xs text-[#749bff]">
          <div className="flex items-center gap-3">
            <span>04</span>
            <span className="text-white/20">/</span>
            <span className="text-[#b2bbc5]">career_and_education</span>
          </div>
          <span className="text-[#6a6d78]">[0{journeyData.length} milestones]</span>
        </div>

        {/* CABEÇALHO LEVE */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.08] text-[#f8f9fc] tracking-[-0.03em]">
            {lang === 'pt' ? 'Experiência & Formação' : 'Experience & Education'}
          </h2>
          <p className="text-[#b2bbc5] font-light text-base md:text-lg max-w-md leading-relaxed">
            {lang === 'pt'
              ? 'Minha evolução prática unindo Engenharia de Software na PUC Minas, mentoria acadêmica e atuação direta em sistemas e infraestrutura corporativa.'
              : 'My hands-on progression combining Software Engineering at PUC Minas, academic mentorship, and direct impact on corporate systems and infrastructure.'}
          </p>
        </div>

        {/* LISTA FLUIDA E MINIMALISTA */}
        <div className="flex flex-col border-b border-white/[0.07]">
          {journeyData.map((item, index) => {
            const isExpanded = expandedIndex === index;

            return (
              <div
                key={item.id}
                onClick={() => toggleExpand(index)}
                className="group border-t border-white/[0.07] cursor-pointer transition-colors duration-300 hover:bg-[#b7bfd9]/[0.02] px-2 md:px-4"
              >
                <div className="py-7 md:py-9 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-baseline gap-4 md:gap-6">
                    <span className="font-['JetBrains_Mono'] text-xs text-[#6a6d78] group-hover:text-[#749bff] transition-colors">
                      0{index + 1}
                    </span>
                    <div>
                      <h3
                        className={`font-normal tracking-[-0.025em] transition-colors duration-300 ${
                          isExpanded
                            ? 'text-2xl md:text-3xl text-[#749bff]'
                            : 'text-2xl md:text-3xl text-[#f8f9fc] group-hover:text-white'
                        }`}
                      >
                        {lang === 'pt' ? item.rolePt : item.roleEn}
                      </h3>
                      <p className="text-xs font-['JetBrains_Mono'] text-[#b2bbc5] mt-1">
                        {item.company}{' '}
                        <span className="text-white/20 mx-1.5">·</span>
                        <span className="text-[#749bff]/80">
                          {lang === 'pt' ? item.badgePt : item.badgeEn}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-start md:self-center">
                    <span className="font-['JetBrains_Mono'] text-xs text-[#b2bbc5]">
                      {lang === 'pt' ? item.yearPt : item.yearEn}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-[#b7bfd9]/[0.07] border border-white/[0.06] flex items-center justify-center font-['JetBrains_Mono'] text-xs text-[#f8f9fc] group-hover:bg-[#b7bfd9]/[0.15] transition-all">
                      {isExpanded ? '−' : '+'}
                    </span>
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                        opacity: { duration: 0.25, ease: 'linear', delay: 0.08 },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="pb-9 pl-0 md:pl-10 max-w-3xl">
                        <p className="text-[#b2bbc5] text-base md:text-[17px] font-light leading-relaxed mb-6">
                          {lang === 'pt' ? item.descriptionPt : item.descriptionEn}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {item.tech.map((t) => (
                            <span
                              key={t}
                              className="px-3.5 py-1.5 rounded-full bg-[#b7bfd9]/[0.06] border border-white/[0.06] font-['JetBrains_Mono'] text-xs text-[#f8f9fc]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
