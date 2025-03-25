


interface AvailabilityStyles {
  bg: string;
  text: string;
}

export const getAvailabilityStyles = (availability_status: string): AvailabilityStyles => {
  switch (availability_status) {
    case 'in stock':
      return {
        bg: 'bg-green-100', // Tailwind class for background color
        text: 'text-green-600', // Tailwind class for text color
      };
    case 'out of stock':
      return {
        bg: 'bg-red-100',
        text: 'text-red-600',
      };
    case 'coming soon':
      return {
        bg: 'bg-blue-100',
        text: 'text-blue-600',
      };
    default:
      return { // Default styles if needed
        bg: 'bg-gray-200',
        text: 'text-gray-700',
      };
  }
};