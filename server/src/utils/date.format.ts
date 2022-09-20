export const DateFormat = {
  formatData(dataToFormat: Partial<{ createdAt; updatedAt }>): Partial<{ createdAt; updatedAt }> {
    return Object.assign(dataToFormat, {
      createdAt: new Intl.DateTimeFormat('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(dataToFormat.createdAt),
      updatedAt: new Intl.DateTimeFormat('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(dataToFormat.updatedAt),
    });
  },
};
