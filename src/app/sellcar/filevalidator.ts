import { AbstractControl, ValidatorFn } from '@angular/forms';

export function fileValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const file = control.value;
    if (!file) {
      return null;
    }
    const error = validateFile(file);
    return error ? { fileError: error } : null;
  };
}

function validateFile(file: File): string {
  const maxSize = 5 * 1024 * 1024; // 5 MB
  const allowedTypes = ['image/jpeg', 'image/png'];

  if (!allowedTypes.includes(file.type)) {
    return 'Invalid file type. Only JPEG and PNG are allowed.';
  }

  if (file.size > maxSize) {
    return 'File size exceeds the maximum limit of 5 MB.';
  }

  return '';
}
