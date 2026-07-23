import { useState } from "react";
import { Box, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import { Highlight, themes } from "prism-react-renderer";
import { useThemeSpec } from "../../lib/theme/ThemeSpecContext";
import { generateThemeCode } from "../../lib/theme/exportTheme";

interface CodeExportDialogProps {
  open: boolean;
  onClose: () => void;
}

export function CodeExportDialog({ open, onClose }: CodeExportDialogProps) {
  const { spec } = useThemeSpec();
  const [copied, setCopied] = useState(false);
  const code = generateThemeCode(spec);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard may be unavailable — the user can still select the text manually.
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        🎨 Add {spec.name} theme to your project ✨
        <Button
          variant="outlined"
          color="inherit"
          sx={{ fontWeight: 700, borderColor: "divider" }}
          size="small"
          startIcon={copied ? <CheckIcon /> : <ContentCopyIcon />}
          onClick={handleCopy}
        >
          {copied ? "Copied" : "Copy to clipboard"}
        </Button>
      </DialogTitle>
      <DialogContent>
        <Highlight code={code.trimEnd()} language="tsx" theme={themes.vsDark}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <Box
              component="pre"
              className={className}
              sx={{
                m: 0,
                p: 2,
                borderRadius: "8px",
                overflow: "auto",
                fontSize: 13,
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              }}
              style={style}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </Box>
          )}
        </Highlight>
      </DialogContent>
    </Dialog>
  );
}
