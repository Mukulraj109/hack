"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { UploadCloud, File, X, CheckCircle2 } from "lucide-react";

interface AnimatedDropzoneProps {
  onFileSelect?: (files: File[]) => void;
  accept?: string;
  maxSize?: number;
  className?: string;
}

export function AnimatedDropzone({
  onFileSelect,
  accept = ".zip,.pdf,.mp4",
  maxSize = 250,
  className = "",
}: AnimatedDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});

  const processFiles = useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files);
    setFiles((prev) => [...prev, ...fileArray]);
    fileArray.forEach((file) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
        }
        setUploadProgress((prev) => ({ ...prev, [file.name]: progress }));
      }, 300);
    });
    onFileSelect?.(fileArray);
  }, [onFileSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  }, [processFiles]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      processFiles(e.target.files);
    }
  }, [processFiles]);

  const removeFile = useCallback((fileName: string) => {
    setFiles((prev) => prev.filter((f) => f.name !== fileName));
    setUploadProgress((prev) => {
      const next = { ...prev };
      delete next[fileName];
      return next;
    });
  }, []);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className={cn("space-y-4", className)}>
      <motion.div
        className={cn(
          "relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 transition-all duration-300",
          isDragging
            ? "scale-[1.02] border-cyan-400 bg-cyan-50 shadow-lg"
            : "border-slate-200 bg-slate-50/50 hover:border-cyan-300 hover:bg-cyan-50/30"
        )}
        onDragEnter={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
        onDragOver={(e) => { e.preventDefault(); }}
        onDrop={handleDrop}
        onClick={() => document.getElementById("file-input")?.click()}
        animate={isDragging ? { scale: 1.02 } : { scale: 1 }}
      >
        <input
          type="file"
          id="file-input"
          className="hidden"
          accept={accept}
          multiple
          onChange={handleFileInput}
        />

        <motion.div
          className={cn(
            "mb-4 flex h-16 w-16 items-center justify-center rounded-full transition-colors duration-300",
            isDragging ? "bg-cyan-100 text-cyan-600" : "bg-slate-100 text-slate-400"
          )}
          animate={isDragging ? { scale: [1, 1.1, 1] } : {}}
          transition={{ repeat: isDragging ? Infinity : 0, duration: 1 }}
        >
          <UploadCloud className={cn("h-8 w-8", isDragging && "animate-bounce")} />
        </motion.div>

        <motion.div
          className="text-center"
          animate={isDragging ? { y: -5 } : { y: 0 }}
        >
          <h3 className={cn(
            "mb-2 text-lg font-bold transition-colors duration-300",
            isDragging ? "text-cyan-600" : "text-slate-700"
          )}>
            {isDragging ? "Drop files here" : "Drag & drop your files"}
          </h3>
          <p className="text-sm text-slate-500">or click to browse</p>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {files.map((file, index) => (
              <motion.div
                key={file.name + index}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                layout
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-50">
                  <File className="h-5 w-5 text-cyan-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-slate-700">{file.name}</p>
                  <p className="text-xs text-slate-400">{formatFileSize(file.size)}</p>
                </div>
                {uploadProgress[file.name] !== undefined && uploadProgress[file.name] < 100 && (
                  <div className="w-20">
                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <motion.div
                        className="h-full bg-cyan-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress[file.name]}%` }}
                      />
                    </div>
                  </div>
                )}
                {uploadProgress[file.name] === 100 && (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                )}
                <button
                  onClick={() => removeFile(file.name)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
