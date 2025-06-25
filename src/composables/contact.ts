import type { Contact, ContactTypes } from '@/api/types/Contact.ts';

export default function useContact() {
  function getContactHREF(contact: Contact) {
    if (contact.type === 'PHONE') {
      return `tel:${contact.value}`;
    } else if (contact.type === 'EMAIL') {
      return `mailto:${contact.value}`;
    }
  }

  function getContactIcon(i: ContactTypes) {
    switch (i) {
      case 'PHONE':
        return 'mdi-phone';
      case 'EMAIL':
        return 'mdi-email';
    }
  }

  return {
    getContactHREF,
    getContactIcon,
  };
}
