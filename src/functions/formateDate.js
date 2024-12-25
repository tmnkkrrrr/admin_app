const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear().toString().slice(-2);
    return `${day} ${month} ${year}`;
  };


  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear().toString().slice(-2);
  
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    const amPm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;  // Convert to 12-hour format, handling midnight and noon
  
    return `${day} ${month} ${year} ${hours}:${minutes} ${amPm}`;
  };
  
  

  module.exports ={ formatDate, formatDateTime};