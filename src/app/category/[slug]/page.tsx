'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Resource } from '@/types/resource';
import { resourceService } from '@/lib/resourceService';
import { ResourceList } from '../../../components/sections/ResourceList';
import { Container } from '../../../components/ui/Container';
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner';

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [resources, setResources] = useState<Resource[]>([]);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      loadResources();
    }
  }, [slug]);

  const loadResources = async () => {
    try {
      setLoading(true);
      const categoriesResult = await resourceService.getCategories();
      if (categoriesResult.success && categoriesResult.data) {
        const currentCategory = categoriesResult.data.find(cat => cat.slug === slug);
        if (currentCategory) {
          setCategoryName(currentCategory.name);
          const resourcesResult = await resourceService.getResourcesByCategory(currentCategory.id);
          if (resourcesResult.success && resourcesResult.data) {
            setResources(resourcesResult.data.resources);
          } else {
            setResources([]);
          }
        }
      }
    } catch (error) {
      console.error('Failed to load resources for category:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-8">
      <h1 className="text-3xl font-bold mb-6">{categoryName}</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      ) : (
        <ResourceList resources={resources} />
      )}
    </Container>
  );
}