import {ChevronDown} from 'lucide-react';
import {questions} from '../../data/presentation';

export function Faq(){return <section className="faq" id="preguntas" aria-labelledby="faq-heading"><h2 id="faq-heading">Preguntas frecuentes</h2><div className="faq-list">{questions.map(([q,a])=><details key={q}><summary>{q}<ChevronDown size={21} aria-hidden="true"/></summary><p>{a}</p></details>)}</div></section>}
