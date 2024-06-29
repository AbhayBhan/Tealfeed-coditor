import { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-javascript";

const CodeEditor = () => {
  const [code, setCode] = useState("");
  const codeRef = useRef<HTMLElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  // This code adds the ability to use tab for indentation purposes.
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const { selectionStart, selectionEnd } = textareaRef.current!;
      setCode(
        code.substring(0, selectionStart) +
          "    " +
          code.substring(selectionEnd)
      );
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart =
            textareaRef.current.selectionEnd = selectionStart + 4;
        }
      }, 0);
    }
  };

  //To Make sure that the scrolling is in sync with the pre tag
  const handleScroll = () => {
    if (preRef.current && textareaRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  return (
    <div className="relative h-72">
      <textarea
        ref={textareaRef}
        value={code}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onScroll={handleScroll}
        spellCheck="false"
        className="w-full h-full font-mono text-base absolute top-1 left-1 bg-transparent text-transparent caret-black z-10 border border-gray-300 p-2.5 box-border overflow-auto"
      />
      <pre
        ref={preRef}
        aria-hidden="true"
        className="w-full h-full m-0 pointer-events-none border border-gray-300 box-border overflow-auto"
      >
        <code
          ref={codeRef}
          className="language-javascript whitespace-pre-wrap break-words"
        >
          {code}
        </code>
      </pre>
    </div>
  );
};

export default CodeEditor;
