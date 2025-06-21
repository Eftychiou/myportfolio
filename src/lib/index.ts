export const downloadFile = () => {
  // Create a Blob with the file content
  const blob = new Blob([''], { type: 'application/pdf' });
  const url = '/George-Eftichiou-CV.pdf';

  // Create a temporary <a> element to initiate the download
  const a = document.createElement('a');
  a.href = url;
  a.download = 'George-Eftichiou-CV.pdf';

  // Append the <a> element to the document body
  document.body.appendChild(a);

  // Initiate the download
  a.click();

  // Cleanup
  URL.revokeObjectURL(url);
  document.body.removeChild(a);
};
