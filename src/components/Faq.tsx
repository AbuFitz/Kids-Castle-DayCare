import * as Accordion from '@radix-ui/react-accordion';
import { faqs } from '../data/site';

export function Faq() {
  return (
    <Accordion.Root type="single" collapsible defaultValue="item-0" className="faq">
      {faqs.map((f, i) => (
        <Accordion.Item key={f.q} value={`item-${i}`} className="faq-item">
            <Accordion.Header style={{ margin: 0 }}>
              <Accordion.Trigger className="faq-trigger">{f.q}<span className="pm" aria-hidden="true" /></Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="faq-content"><p>{f.a}</p></Accordion.Content>
          </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
