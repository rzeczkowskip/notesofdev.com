'use client';

import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import cn from '@/utils/cn';

type CopyCodeButtonProps = {
  code: string;
  className?: string;
};

const CopyCodeButton = ({ code, className }: CopyCodeButtonProps) => {
  const [recentlyCopied, setRecentlyCopied] = useState(false);

  const copyCodeToClipboard = async () => {
    if (!window) {
      return;
    }

    await window.navigator.clipboard.writeText(code);
    setRecentlyCopied(true);

    setTimeout(() => setRecentlyCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        'flex gap-2 flex-nowrap justify-end not-prose absolute text-sm font-sans items-center',
        className,
      )}
    >
      <span
        className={cn(
          'transition-opacity select-none',
          recentlyCopied ? 'opacity-100' : 'opacity-0',
        )}
      >
        Copied
      </span>
      <button
        onClick={copyCodeToClipboard}
        className={cn('text-gray-11 hover:text-gray-12')}
        title="Copy code to clipboard"
      >
        <ClipboardDocumentIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default CopyCodeButton;
