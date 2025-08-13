import React, { useState, useCallback } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  onImageRemove?: () => void;
  selectedImage?: string | null;
  maxSize?: number; // in MB
  accept?: string[];
  multiple?: boolean;
  disabled?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageSelect,
  onImageRemove,
  selectedImage,
  maxSize = 5, // 5MB default
  accept = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  multiple = false,
  disabled = false,
}) => {
  const theme = useTheme();
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      setError(null);

      if (rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0];
        if (rejection.errors[0]?.code === 'file-too-large') {
          setError(`File size must be less than ${maxSize}MB`);
        } else if (rejection.errors[0]?.code === 'file-invalid-type') {
          setError('Please select a valid image file');
        } else {
          setError('Error uploading file');
        }
        return;
      }

      if (acceptedFiles.length > 0) {
        onImageSelect(acceptedFiles[0]);
      }
    },
    [onImageSelect, maxSize]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize: maxSize * 1024 * 1024, // Convert MB to bytes
    multiple,
    disabled,
  });

  const handleRemove = () => {
    if (onImageRemove) {
      onImageRemove();
    }
  };

  return (
    <Box>
      {selectedImage ? (
        <Paper
          elevation={2}
          sx={{
            p: 2,
            textAlign: 'center',
            position: 'relative',
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Box
            component="img"
            src={selectedImage}
            alt="Selected"
            sx={{
              maxWidth: '100%',
              maxHeight: 200,
              objectFit: 'contain',
              borderRadius: 1,
            }}
          />
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 1 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => document.getElementById('image-input')?.click()}
              disabled={disabled}
            >
              Change Image
            </Button>
            {onImageRemove && (
              <IconButton
                color="error"
                size="small"
                onClick={handleRemove}
                disabled={disabled}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Box>
          <input
            id="image-input"
            {...getInputProps()}
            style={{ display: 'none' }}
          />
        </Paper>
      ) : (
        <Paper
          {...getRootProps()}
          elevation={2}
          sx={{
            p: 3,
            textAlign: 'center',
            cursor: disabled ? 'not-allowed' : 'pointer',
            border: `2px dashed ${
              isDragActive
                ? theme.palette.primary.main
                : theme.palette.divider
            }`,
            backgroundColor: isDragActive
              ? theme.palette.primary.light + '10'
              : theme.palette.background.paper,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              borderColor: theme.palette.primary.main,
              backgroundColor: theme.palette.primary.light + '10',
            },
          }}
        >
          <input {...getInputProps()} />
          <CloudUploadIcon
            sx={{
              fontSize: 48,
              color: theme.palette.primary.main,
              mb: 2,
            }}
          />
          <Typography variant="h6" gutterBottom>
            {isDragActive ? 'Drop the image here' : 'Upload Image'}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Drag and drop an image here, or click to select
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Supported formats: JPEG, PNG, GIF, WebP (Max {maxSize}MB)
          </Typography>
        </Paper>
      )}

      {error && (
        <Typography
          variant="body2"
          color="error"
          sx={{ mt: 1, textAlign: 'center' }}
        >
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default ImageUpload;
