import { contactPrompts } from '../data';

export default function ContactPrompts() {
  return (
    <h1 className="shrink-0 text-2xl leading-snug lg:text-[2.15vw] lg:leading-[1.25]">
      {contactPrompts.map((prompt) => (
        <span key={prompt} className="block">
          {prompt}
        </span>
      ))}
    </h1>
  );
}
