// file: src/services/serviceType.ts

export interface ServiceTypeData {
    serviceName: string;
    serviceImage: string;
    description: string;
  }
  
  export interface ServiceType extends ServiceTypeData {
    id: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export const serviceTypeService = {
    async getServiceTypes(): Promise<ServiceType[]> {
      const response = await fetch('/api/service');
      if (!response.ok) {
        throw new Error('Failed to fetch service types');
      }
      const data = await response.json();
      return data.serviceTypes;
    },
  
    async createServiceType(serviceTypeData: ServiceTypeData): Promise<ServiceType> {
      const response = await fetch('/api/service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceTypeData),
      });
      if (!response.ok) {
        throw new Error('Failed to create service type');
      }
      const data = await response.json();
      return data.serviceType;
    },
  
    async deleteServiceType(id: string): Promise<void> {
      const response = await fetch(`/api/service?id=${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete service type');
      }
    },
  
    async updateServiceType(id: string, serviceTypeData: Partial<ServiceTypeData>): Promise<ServiceType> {
      const response = await fetch(`/api/service?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceTypeData),
      });
      if (!response.ok) {
        throw new Error('Failed to update service type');
      }
      const data = await response.json();
      return data.serviceType;
    },
  };