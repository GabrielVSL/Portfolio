import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

/**
 * Símbolo do OS (17 linhas x 36 colunas) construído em sub-blocos Unicode nativos
 * da JetBrains Mono (█, ▀, ▄), extraído com simetria rotacional de 180° a partir da imagem.
 */
const CRUX_LOGO = [
  '█████▄▄▄▄▄                          ',
  ' ▀████████████▄▄▄                   ',
  '   ▀▀████████████  ▄██▄▄▄           ',
  '      ▀▀█████████  ████████▄▄       ',
  '         ▀███████  ███████████▄▄    ',
  '          ███████  ██████████████   ',
  '         ▄███████  ███████████████  ',
  '      ▄▄█████████  ██████████████▀  ',
  '   ▄▄████████████  ████████████▀▀   ',
  '  ▄██████████████  █████████▀▀      ',
  '  ███████████████  ███████▀         ',
  '   ██████████████  ███████          ',
  '    ▀▀███████████  ███████▄         ',
  '       ▀▀████████  █████████▄▄      ',
  '           ▀▀▀██▀  ████████████▄▄   ',
  '                   ▀▀▀████████████▄ ',
  '                          ▀▀▀▀▀█████',
];

// Total de linhas impressas pelo fastfetch (17 linhas — 1:1 com o painel direito)
const FETCH_LINES = CRUX_LOGO.length;

const BOOT_LOGS = [
  {
    prefix: '[  OK  ]',
    prefixColor: 'text-[#27c93f]',
    text: 'Started Linux 6.12.4-x86_64 Full Stack Workstation (tty1)',
  },
  {
    prefix: '[  OK  ]',
    prefixColor: 'text-[#27c93f]',
    text: 'Mounted /dev/nvme0n1p2 -> /home/gabriel (ro,noatime)',
  },
  {
    prefix: '[  OK  ]',
    prefixColor: 'text-[#27c93f]',
    text: 'Reached target Network Online · belo-horizonte.mg.br',
  },
];

const AVAILABLE_COMMANDS = [
  'help',
  'fastfetch',
  'contact',
  'email',
  'copy',
  'linkedin',
  'github',
  'whoami',
  'projects',
  'skills',
  'ls',
  'cat contact.txt',
  'cat about.md',
  'uname -a',
  'date',
  'pwd',
  'clear',
];

export default function ContactSection() {
  const { lang } = useLanguage();
  const [time, setTime] = useState(new Date());
  const [copied, setCopied] = useState(false);

  // Estado unificado de boot para evitar inconsistências em Hot Reload (HMR)
  const [bootState, setBootState] = useState({
    started: false,
    logsCount: 0,
    typedCmd: '',
    cmdEntered: false,
    fetchLines: 0,
    cleared: false,
    runId: 0,
  });

  // Estados do shell interativo
  const [cmdInput, setCmdInput] = useState('');
  const [history, setHistory] = useState([]);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyCursor, setHistoryCursor] = useState(-1);

  const sectionRef = useRef(null);
  const terminalBodyRef = useRef(null);
  const inputRef = useRef(null);

  // Relógio em tempo real no rodapé
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Dispara o boot assim que o terminal entra na viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBootState((prev) => (prev.started ? prev : { ...prev, started: true }));
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Sequência de inicialização: logs -> digitação de "fastfetch" -> stdout linha a linha
  useEffect(() => {
    if (!bootState.started) return;

    let cancelled = false;
    const timers = [];

    const after = (ms, patchFn) => {
      const id = setTimeout(() => {
        if (!cancelled) {
          setBootState((prev) => patchFn(prev));
        }
      }, ms);
      timers.push(id);
    };

    // 1. Logs de inicialização aparecendo um a um
    BOOT_LOGS.forEach((_, idx) => {
      after((idx + 1) * 160, (prev) => ({ ...prev, logsCount: idx + 1 }));
    });

    // 2. Digitação de "fastfetch" letra por letra
    const cmd = 'fastfetch';
    const typeStart = BOOT_LOGS.length * 160 + 240;
    for (let i = 1; i <= cmd.length; i++) {
      after(typeStart + i * 65, (prev) => ({
        ...prev,
        typedCmd: cmd.slice(0, i),
      }));
    }

    // 3. Enter no comando e revelação linha a linha do fastfetch
    const enterTime = typeStart + cmd.length * 65 + 180;
    after(enterTime, (prev) => ({ ...prev, cmdEntered: true }));

    const totalLines = FETCH_LINES;
    for (let line = 1; line <= totalLines; line++) {
      after(enterTime + line * 38, (prev) => ({
        ...prev,
        fetchLines: line,
      }));
    }

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [bootState.started, bootState.runId]);

  // Rola para o final apenas quando o usuário executa comandos no histórico interativo
  useEffect(() => {
    if (history.length > 0 && terminalBodyRef.current) {
      requestAnimationFrame(() => {
        if (terminalBodyRef.current) {
          terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
        }
      });
    }
  }, [history]);

  const copyEmailToClipboard = useCallback(() => {
    navigator.clipboard?.writeText('gabrieelvictor26@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  }, []);

  // Renderiza a saída do fastfetch (5 estrelas estilo figlet à esquerda + chaves/valores à direita)
  const renderFastfetchBlock = (maxLines = FETCH_LINES) => {
    const rightLines = [
      <div key="r0" className="font-semibold">
        <span className="text-[#5ce1e6]">gabriel</span>
        <span className="text-[#8a93a2]">@</span>
        <span className="text-[#749bff]">workstation</span>
      </div>,
      <div key="r1" className="text-[#6a6d78] select-none">
        -------------------
      </div>,
      <div key="r2">
        <span className="text-[#5ce1e6] font-semibold">OS</span>
        <span className="text-[#8a93a2]">: </span>
        <span className="text-[#e2e8f0]">Linux 6.12 x86_64 (Full Stack Workstation)</span>
      </div>,
      <div key="r3">
        <span className="text-[#5ce1e6] font-semibold">Host</span>
        <span className="text-[#8a93a2]">: </span>
        <span className="text-[#e2e8f0]">
          {lang === 'pt'
            ? 'PUC Minas (Engenharia de Software · 2028)'
            : 'PUC Minas (B.S. Software Engineering · 2028)'}
        </span>
      </div>,
      <div key="r4">
        <span className="text-[#5ce1e6] font-semibold">Kernel</span>
        <span className="text-[#8a93a2]">: </span>
        <span className="text-[#e2e8f0]">
          6.12.4-cspc <span className="text-[#27c93f]">(-30% support tickets)</span>
        </span>
      </div>,
      <div key="r5">
        <span className="text-[#5ce1e6] font-semibold">Uptime</span>
        <span className="text-[#8a93a2]">: </span>
        <span className="text-[#e2e8f0]">
          {lang === 'pt'
            ? '2+ anos (Sistemas Web, APIs & Arquitetura)'
            : '2+ years (Web Systems, APIs & Architecture)'}
        </span>
      </div>,
      <div key="r6">
        <span className="text-[#5ce1e6] font-semibold">Packages</span>
        <span className="text-[#8a93a2]">: </span>
        <span className="text-[#e2e8f0]">
          14 (react, node, ts, java, csharp, swift, sql, docker)
        </span>
      </div>,
      <div key="r7">
        <span className="text-[#5ce1e6] font-semibold">Shell</span>
        <span className="text-[#8a93a2]">: </span>
        <span className="text-[#e2e8f0]">zsh 5.9</span>
      </div>,
      <div key="r8">
        <span className="text-[#5ce1e6] font-semibold">Locale</span>
        <span className="text-[#8a93a2]">: </span>
        <span className="text-[#e2e8f0]">
          {lang === 'pt'
            ? 'Belo Horizonte, MG (pt_BR.UTF-8 / Inglês Avançado)'
            : 'Belo Horizonte, MG (pt_BR.UTF-8 / Advanced English)'}
        </span>
      </div>,
      <div key="r9">
        <span className="text-[#5ce1e6] font-semibold">Status</span>
        <span className="text-[#8a93a2]">: </span>
        <span className="text-[#27c93f]">
          {lang === 'pt'
            ? 'Disponível para Oportunidades (Híbrido / Remoto)'
            : 'Open to Opportunities (Hybrid / Remote)'}
        </span>
      </div>,
      <div key="r10" className="text-[#6a6d78] select-none">
        -------------------
      </div>,
      <div key="r11">
        <span className="text-[#5ce1e6] font-semibold">Email</span>
        <span className="text-[#8a93a2]">: </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            copyEmailToClipboard();
          }}
          className="text-[#f8f9fc] hover:text-[#5ce1e6] underline decoration-white/25 hover:decoration-[#5ce1e6] underline-offset-4 transition-colors cursor-pointer"
        >
          gabrieelvictor26@gmail.com
        </button>
        {copied && (
          <span className="ml-2 text-[#27c93f]">
            {lang === 'pt' ? '[copiado!]' : '[copied!]'}
          </span>
        )}
      </div>,
      <div key="r12">
        <span className="text-[#5ce1e6] font-semibold">LinkedIn</span>
        <span className="text-[#8a93a2]">: </span>
        <a
          href="https://www.linkedin.com/in/gabrielvictorsouza/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-[#f8f9fc] hover:text-[#5ce1e6] underline decoration-white/25 hover:decoration-[#5ce1e6] underline-offset-4 transition-colors"
        >
          linkedin.com/in/gabrielvictorsouza
        </a>
      </div>,
      <div key="r13">
        <span className="text-[#5ce1e6] font-semibold">GitHub</span>
        <span className="text-[#8a93a2]">: </span>
        <a
          href="https://github.com/GabrielVSL"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-[#f8f9fc] hover:text-[#5ce1e6] underline decoration-white/25 hover:decoration-[#5ce1e6] underline-offset-4 transition-colors"
        >
          github.com/GabrielVSL
        </a>
      </div>,
      <div key="r14" className="h-[1.35em] select-none" aria-hidden="true" />,
      <div key="r15" className="select-none leading-none">
        <span className="text-[#1e222a]">███</span>
        <span className="text-[#ff5f56]">███</span>
        <span className="text-[#27c93f]">███</span>
        <span className="text-[#eab308]">███</span>
        <span className="text-[#3279f9]">███</span>
        <span className="text-[#a855f7]">███</span>
        <span className="text-[#5ce1e6]">███</span>
        <span className="text-[#d2d7e0]">███</span>
      </div>,
      <div key="r16" className="select-none leading-none">
        <span className="text-[#383e4c]">███</span>
        <span className="text-[#ff7b72]">███</span>
        <span className="text-[#56d364]">███</span>
        <span className="text-[#facc15]">███</span>
        <span className="text-[#749bff]">███</span>
        <span className="text-[#c77dff]">███</span>
        <span className="text-[#a5f3fc]">███</span>
        <span className="text-[#f8f9fc]">███</span>
      </div>,
    ];

    return (
      <div className="my-2.5 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12">
        {/* Símbolo do OS em sub-blocos Unicode nativos da JetBrains Mono */}
        <pre className="font-['JetBrains_Mono'] text-[11px] sm:text-[14px] md:text-[15px] leading-none tracking-normal text-[#3279f9] select-none shrink-0 overflow-x-auto">
          {CRUX_LOGO.slice(0, maxLines).map((line, rowIdx) => (
            <div key={rowIdx} className="whitespace-pre leading-none">
              {line}
            </div>
          ))}
        </pre>

        {/* Informações de Sistema e Contato à Direita */}
        <div className="font-['JetBrains_Mono'] text-[12px] sm:text-[13px] leading-[1.35] flex flex-col min-w-0">
          {rightLines.slice(0, maxLines)}
        </div>
      </div>
    );
  };

  // Executa comandos digitados no terminal
  const executeCommand = (rawInput) => {
    const trimmed = rawInput.trim();
    const lower = trimmed.toLowerCase();

    if (trimmed) {
      setCmdHistory((prev) => [...prev, trimmed]);
      setHistoryCursor(-1);
    }

    if (!trimmed) {
      setHistory((prev) => [
        ...prev,
        { id: Date.now() + Math.random(), cmd: '', output: null },
      ]);
      setCmdInput('');
      return;
    }

    if (lower === 'clear' || lower === 'cls') {
      setBootState((prev) => ({ ...prev, cleared: true }));
      setHistory([]);
      setCmdInput('');
      return;
    }

    if (lower === 'reboot' || lower === 'sudo reboot') {
      setHistory([]);
      setBootState((prev) => ({
        started: true,
        logsCount: 0,
        typedCmd: '',
        cmdEntered: false,
        fetchLines: 0,
        cleared: false,
        runId: prev.runId + 1,
      }));
      setCmdInput('');
      return;
    }

    let outputNode = null;

    if (lower === 'fastfetch' || lower === 'neofetch') {
      outputNode = renderFastfetchBlock(FETCH_LINES);
    } else if (lower === 'help' || lower === '--help' || lower === '-h') {
      outputNode = (
        <div className="my-1.5 text-[#d2d7e0] space-y-1">
          <div className="text-[#5ce1e6]">
            {lang === 'pt'
              ? 'GNU zsh, versão 5.9 (x86_64-pc-linux-gnu) — Comandos disponíveis:'
              : 'GNU zsh, version 5.9 (x86_64-pc-linux-gnu) — Available commands:'}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0.5 pl-2">
            <div>
              <span className="text-[#749bff] inline-block w-36">fastfetch</span>
              <span className="text-[#8a93a2]">
                {lang === 'pt' ? 'Exibe resumo do sistema e contatos' : 'Print system & contact summary'}
              </span>
            </div>
            <div>
              <span className="text-[#749bff] inline-block w-36">contact</span>
              <span className="text-[#8a93a2]">
                {lang === 'pt' ? 'Lista todos os canais diretos' : 'List all direct contact channels'}
              </span>
            </div>
            <div>
              <span className="text-[#749bff] inline-block w-36">email / sudo hire</span>
              <span className="text-[#8a93a2]">
                {lang === 'pt' ? 'Copia e-mail e abre cliente de correio' : 'Copy email & open mail client'}
              </span>
            </div>
            <div>
              <span className="text-[#749bff] inline-block w-36">copy</span>
              <span className="text-[#8a93a2]">
                {lang === 'pt' ? 'Copia o e-mail para o clipboard' : 'Copy email address to clipboard'}
              </span>
            </div>
            <div>
              <span className="text-[#749bff] inline-block w-36">linkedin</span>
              <span className="text-[#8a93a2]">
                {lang === 'pt' ? 'Abre o perfil do LinkedIn' : 'Open LinkedIn profile in new tab'}
              </span>
            </div>
            <div>
              <span className="text-[#749bff] inline-block w-36">github</span>
              <span className="text-[#8a93a2]">
                {lang === 'pt' ? 'Abre os repositórios no GitHub' : 'Open GitHub repositories'}
              </span>
            </div>
            <div>
              <span className="text-[#749bff] inline-block w-36">whoami</span>
              <span className="text-[#8a93a2]">
                {lang === 'pt' ? 'Resumo profissional do desenvolvedor' : 'Developer bio & current role'}
              </span>
            </div>
            <div>
              <span className="text-[#749bff] inline-block w-36">projects / skills</span>
              <span className="text-[#8a93a2]">
                {lang === 'pt' ? 'Lista projetos ou stack técnica' : 'List projects or technical stack'}
              </span>
            </div>
            <div>
              <span className="text-[#749bff] inline-block w-36">ls / cat &lt;file&gt;</span>
              <span className="text-[#8a93a2]">
                {lang === 'pt' ? 'Explora arquivos do diretório' : 'Explore directory files'}
              </span>
            </div>
            <div>
              <span className="text-[#749bff] inline-block w-36">clear / reboot</span>
              <span className="text-[#8a93a2]">
                {lang === 'pt' ? 'Limpa a tela ou reinicia o terminal' : 'Clear screen or reboot terminal'}
              </span>
            </div>
          </div>
        </div>
      );
    } else if (lower === 'contact' || lower === 'cat contact.txt') {
      copyEmailToClipboard();
      outputNode = (
        <div className="my-1.5 text-[#d2d7e0] space-y-0.5">
          <div>
            Email    : <span className="text-[#5ce1e6]">gabrieelvictor26@gmail.com</span>{' '}
            <span className="text-[#27c93f]">
              {lang === 'pt' ? '(copiado para a área de transferência)' : '(copied to clipboard)'}
            </span>
          </div>
          <div>
            LinkedIn :{' '}
            <a
              href="https://www.linkedin.com/in/gabrielvictorsouza/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#749bff] underline"
            >
              https://www.linkedin.com/in/gabrielvictorsouza/
            </a>
          </div>
          <div>
            GitHub   :{' '}
            <a
              href="https://github.com/GabrielVSL"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#749bff] underline"
            >
              https://github.com/GabrielVSL
            </a>
          </div>
          <div>Location : Belo Horizonte, MG — Brasil</div>
        </div>
      );
    } else if (
      lower === 'email' ||
      lower === 'sudo hire' ||
      lower === './send-email.sh'
    ) {
      copyEmailToClipboard();
      window.location.href = 'mailto:gabrieelvictor26@gmail.com';
      outputNode = (
        <div className="my-1 text-[#27c93f]">
          {lang === 'pt'
            ? '[OK] E-mail copiado (gabrieelvictor26@gmail.com) e abrindo cliente de e-mail...'
            : '[OK] Email copied (gabrieelvictor26@gmail.com) and opening mail client...'}
        </div>
      );
    } else if (lower === 'copy' || lower === './copy-email.sh') {
      copyEmailToClipboard();
      outputNode = (
        <div className="my-1 text-[#27c93f]">
          {lang === 'pt'
            ? '[OK] gabrieelvictor26@gmail.com copiado para a área de transferência.'
            : '[OK] gabrieelvictor26@gmail.com copied to clipboard.'}
        </div>
      );
    } else if (lower === 'linkedin' || lower === './linkedin.sh') {
      window.open(
        'https://www.linkedin.com/in/gabrielvictorsouza/',
        '_blank',
        'noopener,noreferrer'
      );
      outputNode = (
        <div className="my-1 text-[#5ce1e6]">
          {lang === 'pt'
            ? '[↗] Abrindo https://www.linkedin.com/in/gabrielvictorsouza/ ...'
            : '[↗] Opening https://www.linkedin.com/in/gabrielvictorsouza/ ...'}
        </div>
      );
    } else if (lower === 'github' || lower === './github.sh') {
      window.open('https://github.com/GabrielVSL', '_blank', 'noopener,noreferrer');
      outputNode = (
        <div className="my-1 text-[#5ce1e6]">
          {lang === 'pt'
            ? '[↗] Abrindo https://github.com/GabrielVSL ...'
            : '[↗] Opening https://github.com/GabrielVSL ...'}
        </div>
      );
    } else if (lower === 'whoami' || lower === 'cat about.md') {
      outputNode = (
        <div className="my-1.5 text-[#d2d7e0] max-w-3xl space-y-1">
          <div className="text-[#f8f9fc] font-semibold">
            Gabriel Victor Souza Lopes — Full Stack Developer &amp; Systems Analyst
          </div>
          <div>
            {lang === 'pt'
              ? 'Graduando em Engenharia de Software na PUC Minas (2028) e Analista de Sistemas no Colégio São Paulo da Cruz, onde liderou a reformulação digital que reduziu os chamados técnicos em 30%.'
              : 'Software Engineering student at PUC Minas (2028) and Systems Analyst at Colégio São Paulo da Cruz, where he led a digital overhaul that reduced technical support tickets by 30%.'}
          </div>
        </div>
      );
    } else if (lower === 'projects' || lower === 'cat projects.json') {
      outputNode = (
        <div className="my-1.5 text-[#d2d7e0] space-y-0.5">
          <div>
            <span className="text-[#5ce1e6]">01. Orderly</span>      — SaaS Monorepo (React, TypeScript, Node.js, PostgreSQL, Docker)
          </div>
          <div>
            <span className="text-[#5ce1e6]">02. Portal CSPC</span>  — Institutional EdTech Platform (-30% support tickets in production)
          </div>
          <div>
            <span className="text-[#5ce1e6]">03. BHFlix</span>       — Streaming Catalog &amp; Discovery Engine (React, REST APIs)
          </div>
          <div>
            <span className="text-[#5ce1e6]">04. ClearPath</span>    — Intelligent Task &amp; Workflow Manager
          </div>
          <div>
            <span className="text-[#749bff]">+ Repos:</span> RentCars (Java/Spring), Educoins (Merit System), Threads Sync, GSA
          </div>
        </div>
      );
    } else if (lower === 'skills' || lower === 'packages' || lower === 'cat stack.conf') {
      outputNode = (
        <div className="my-1.5 text-[#d2d7e0] space-y-0.5">
          <div>
            <span className="text-[#5ce1e6]">frontend :</span> React, TypeScript, JavaScript (ES6+), Tailwind CSS, HTML5/CSS3
          </div>
          <div>
            <span className="text-[#5ce1e6]">backend  :</span> Node.js, Java (Spring Boot), C# (.NET), Swift, REST APIs
          </div>
          <div>
            <span className="text-[#5ce1e6]">data/ops :</span> PostgreSQL, MySQL, Prisma, Docker, Git, Linux
          </div>
        </div>
      );
    } else if (lower === 'ls' || lower === 'ls -la' || lower === 'ls -l') {
      outputNode = (
        <div className="my-1 flex flex-wrap gap-x-6 gap-y-1">
          <span className="text-[#f8f9fc]">about.md</span>
          <span className="text-[#f8f9fc]">contact.txt</span>
          <span className="text-[#f8f9fc]">projects.json</span>
          <span className="text-[#f8f9fc]">stack.conf</span>
          <span className="text-[#27c93f]">send-email.sh*</span>
        </div>
      );
    } else if (lower === 'pwd') {
      outputNode = <div className="my-1 text-[#d2d7e0]">/home/gabriel</div>;
    } else if (lower === 'date') {
      outputNode = <div className="my-1 text-[#d2d7e0]">{new Date().toString()}</div>;
    } else if (lower.startsWith('uname')) {
      outputNode = (
        <div className="my-1 text-[#d2d7e0]">
          Linux workstation 6.12.4-x86_64 #1 SMP PREEMPT_DYNAMIC Full-Stack x86_64 GNU/Linux
        </div>
      );
    } else if (lower.startsWith('echo ')) {
      outputNode = <div className="my-1 text-[#d2d7e0]">{trimmed.slice(5)}</div>;
    } else {
      outputNode = (
        <div className="my-1 text-[#ff7b72]">
          zsh: {lang === 'pt' ? 'comando não encontrado' : 'command not found'}: {trimmed}{' '}
          <span className="text-[#8a93a2]">
            ({lang === 'pt' ? 'digite "help"' : 'type "help"'})
          </span>
        </div>
      );
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        cmd: trimmed,
        output: outputNode,
      },
    ]);
    setCmdInput('');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    executeCommand(cmdInput);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextCursor =
        historyCursor === -1 ? cmdHistory.length - 1 : Math.max(0, historyCursor - 1);
      setHistoryCursor(nextCursor);
      setCmdInput(cmdHistory[nextCursor]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyCursor === -1) return;
      const nextCursor = historyCursor + 1;
      if (nextCursor >= cmdHistory.length) {
        setHistoryCursor(-1);
        setCmdInput('');
      } else {
        setHistoryCursor(nextCursor);
        setCmdInput(cmdHistory[nextCursor]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const current = cmdInput.trim().toLowerCase();
      if (!current) return;
      const match = AVAILABLE_COMMANDS.find((c) => c.startsWith(current));
      if (match) {
        setCmdInput(match);
      }
    }
  };

  const focusTerminalInput = () => {
    const selection = window.getSelection?.();
    if (selection && selection.toString().length > 0) return;
    inputRef.current?.focus();
  };

  const bootDone = bootState.fetchLines >= FETCH_LINES;

  return (
    <section
      ref={sectionRef}
      id="contato"
      className="relative z-10 w-full bg-transparent pt-20 pb-12 px-4 sm:px-8 flex flex-col justify-between pointer-events-auto border-t border-dashed border-white/[0.1]"
    >
      {/* Container Principal Emoldurado sobre a Grade de Respiro */}
      <div className="max-w-[1280px] w-full mx-auto border border-dashed border-white/[0.14] bg-[#0d0e13] p-6 sm:p-10 lg:p-14 relative overflow-hidden">
        {/* Luz difusa suave no topo */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 w-[480px] h-[220px] rounded-full bg-[#3279f9]/10 blur-[110px]"
        />

        {/* Cabeçalho da Seção */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="font-['JetBrains_Mono'] text-xs tracking-[0.14em] uppercase text-[#749bff] block mb-3">
              05 / terminal
            </span>
            <h2 className="text-3xl sm:text-5xl font-semibold leading-[1.08] text-[#f8f9fc] tracking-[-0.03em]">
              {lang === 'pt'
                ? 'Vamos conversar sobre sua próxima oportunidade?'
                : "Let's talk about your next opportunity?"}
            </h2>
          </div>

          <p className="text-[#b2bbc5] font-light text-sm sm:text-base max-w-md leading-relaxed">
            {lang === 'pt'
              ? 'Clique nos links diretos ou digite comandos no terminal (ex: help, email, linkedin, github, clear).'
              : 'Click the direct links or type commands in the terminal (e.g. help, email, linkedin, github, clear).'}
          </p>
        </div>

        {/* =====================================================================
            EMULADOR DE TERMINAL LINUX (ALTURA FIXA, SEM BARRA DE ATALHOS)
           ===================================================================== */}
        <div
          onClick={focusTerminalInput}
          className="w-full rounded-xl bg-[#07080c] border border-white/[0.12] shadow-[0_24px_60px_rgba(0,0,0,0.85)] overflow-hidden font-['JetBrains_Mono'] cursor-text"
        >
          {/* Barra de Título da Janela do Terminal */}
          <div className="h-10 px-4 bg-[#11131a] border-b border-white/[0.08] flex items-center justify-between select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>

            <div className="text-[11px] text-[#8a93a2] truncate">
              gabriel@workstation: ~ — zsh (80×24)
            </div>

            <div className="w-12" />
          </div>

          {/* Tela do Terminal com Altura Fixa para nunca encolher ou expandir no boot/clear */}
          <div
            ref={terminalBodyRef}
            className="p-5 sm:p-6 text-[12px] sm:text-[13px] leading-[1.4] h-[540px] sm:h-[560px] overflow-y-auto"
          >
            {/* Bloco Inicial: Logs de Boot + Comando fastfetch auto-digitado */}
            {!bootState.cleared && (
              <div>
                {/* 1. Logs de Inicialização do Sistema */}
                {bootState.logsCount > 0 && (
                  <div className="space-y-0.5 mb-3 text-[11.5px] sm:text-[12px]">
                    {BOOT_LOGS.slice(0, bootState.logsCount).map((log, index) => (
                      <div key={index} className="text-[#8a93a2]">
                        <span className={`${log.prefixColor} font-semibold mr-2`}>
                          {log.prefix}
                        </span>
                        <span>{log.text}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* 2. Linha onde o comando "fastfetch" é digitado automaticamente */}
                {bootState.logsCount >= BOOT_LOGS.length && (
                  <div className="flex items-center flex-wrap">
                    <span className="text-[#27c93f] font-semibold">gabriel@workstation</span>
                    <span className="text-[#8a93a2]">:</span>
                    <span className="text-[#3279f9] font-semibold">~</span>
                    <span className="text-[#8a93a2] mr-2">$</span>
                    <span className="text-[#f8f9fc]">{bootState.typedCmd}</span>
                    {!bootState.cmdEntered && (
                      <span className="inline-block w-2 h-4 bg-[#5ce1e6] ml-0.5 animate-pulse align-middle" />
                    )}
                  </div>
                )}

                {/* 3. Saída do Fastfetch revelada linha a linha */}
                {bootState.cmdEntered &&
                  bootState.fetchLines > 0 &&
                  renderFastfetchBlock(bootState.fetchLines)}
              </div>
            )}

            {/* 4. Histórico de Comandos Executados pelo Usuário */}
            {history.map((entry) => (
              <div key={entry.id} className="mt-2">
                <div className="flex items-center flex-wrap">
                  <span className="text-[#27c93f] font-semibold">gabriel@workstation</span>
                  <span className="text-[#8a93a2]">:</span>
                  <span className="text-[#3279f9] font-semibold">~</span>
                  <span className="text-[#8a93a2] mr-2">$</span>
                  <span className="text-[#f8f9fc]">{entry.cmd}</span>
                </div>
                {entry.output}
              </div>
            ))}

            {/* 5. Linha de Prompt Interativa Ativa */}
            {(bootDone || bootState.cleared) && (
              <form
                onSubmit={handleFormSubmit}
                className="mt-2 flex items-center flex-wrap"
              >
                <span className="text-[#27c93f] font-semibold shrink-0">
                  gabriel@workstation
                </span>
                <span className="text-[#8a93a2] shrink-0">:</span>
                <span className="text-[#3279f9] font-semibold shrink-0">~</span>
                <span className="text-[#8a93a2] mr-2 shrink-0">$</span>

                <div className="relative flex-1 min-w-[180px] flex items-center">
                  <input
                    ref={inputRef}
                    type="text"
                    value={cmdInput}
                    onChange={(e) => setCmdInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    spellCheck={false}
                    autoComplete="off"
                    autoCapitalize="off"
                    aria-label={
                      lang === 'pt' ? 'Comando do terminal' : 'Terminal command input'
                    }
                    placeholder={
                      history.length === 0 && !bootState.cleared ? 'help' : ''
                    }
                    className="w-full bg-transparent text-[#f8f9fc] placeholder-[#383e4c] focus:outline-none caret-[#5ce1e6]"
                  />
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* RODAPÉ MINIMALISTA */}
      <div className="w-full max-w-[1280px] mx-auto mt-10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-['JetBrains_Mono'] text-xs text-[#6a6d78]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[#b2bbc5]">
              {lang === 'pt' ? 'SISTEMA ONLINE · DISPONÍVEL' : 'SYSTEM ONLINE · AVAILABLE'}
            </span>
          </div>
          <span className="text-white/15">·</span>
          <span>
            BH / BRT:{' '}
            {time.toLocaleTimeString('en-US', {
              hour12: false,
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>

        <div className="text-center sm:text-right">
          © {new Date().getFullYear()} GABRIEL VICTOR SOUZA LOPES (@GabrielVSL)
        </div>
      </div>
    </section>
  );
}
