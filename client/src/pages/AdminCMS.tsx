import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { 
  Settings, 
  FileText, 
  Navigation, 
  Layout, 
  Edit, 
  Trash2, 
  Plus,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';
import type { PageContent, NavigationItem, ComponentSetting } from '@shared/schema';

export default function AdminCMS() {
  const [activeTab, setActiveTab] = useState('pages');
  const [editingItem, setEditingItem] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Queries
  const { data: pages = [], isLoading: pagesLoading } = useQuery({
    queryKey: ['/api/admin/pages'],
  });

  const { data: navigation = [], isLoading: navLoading } = useQuery({
    queryKey: ['/api/admin/navigation'],
  });

  const { data: components = [], isLoading: componentsLoading } = useQuery({
    queryKey: ['/api/admin/components'],
  });

  // Mutations
  const updatePageMutation = useMutation({
    mutationFn: async ({ pageKey, data }: { pageKey: string; data: any }) => {
      return apiRequest(`/api/admin/pages/${pageKey}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/pages'] });
      toast({ title: "Success", description: "Page updated successfully" });
      setEditingItem(null);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update page", variant: "destructive" });
    },
  });

  const updateNavMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      return apiRequest(`/api/admin/navigation/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/navigation'] });
      toast({ title: "Success", description: "Navigation updated successfully" });
      setEditingItem(null);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update navigation", variant: "destructive" });
    },
  });

  const updateComponentMutation = useMutation({
    mutationFn: async ({ componentKey, data }: { componentKey: string; data: any }) => {
      return apiRequest(`/api/admin/components/${componentKey}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/components'] });
      toast({ title: "Success", description: "Component updated successfully" });
      setEditingItem(null);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update component", variant: "destructive" });
    },
  });

  const deleteNavMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest(`/api/admin/navigation/${id}`, { method: 'DELETE' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/navigation'] });
      toast({ title: "Success", description: "Navigation item deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete navigation item", variant: "destructive" });
    },
  });

  const handleEditPage = (page: PageContent) => {
    setEditingItem({
      type: 'page',
      data: page,
      formData: {
        title: page.title,
        content: JSON.stringify(page.content, null, 2),
        isActive: page.isActive,
      }
    });
  };

  const handleEditNav = (navItem: NavigationItem) => {
    setEditingItem({
      type: 'navigation',
      data: navItem,
      formData: {
        label: navItem.label,
        href: navItem.href,
        type: navItem.type,
        position: navItem.position,
        isVisible: navItem.isVisible,
      }
    });
  };

  const handleEditComponent = (component: ComponentSetting) => {
    setEditingItem({
      type: 'component',
      data: component,
      formData: {
        settings: JSON.stringify(component.settings, null, 2),
        isActive: component.isActive,
      }
    });
  };

  const handleSave = () => {
    if (!editingItem) return;

    const { type, data, formData } = editingItem;

    switch (type) {
      case 'page':
        try {
          const parsedContent = JSON.parse(formData.content);
          updatePageMutation.mutate({
            pageKey: data.pageKey,
            data: {
              title: formData.title,
              content: parsedContent,
              isActive: formData.isActive,
              updatedBy: 1, // Admin user ID
            }
          });
        } catch (error) {
          toast({ title: "Error", description: "Invalid JSON in content field", variant: "destructive" });
        }
        break;
      
      case 'navigation':
        updateNavMutation.mutate({
          id: data.id,
          data: formData
        });
        break;
      
      case 'component':
        try {
          const parsedSettings = JSON.parse(formData.settings);
          updateComponentMutation.mutate({
            componentKey: data.componentKey,
            data: {
              settings: parsedSettings,
              isActive: formData.isActive,
              updatedBy: 1, // Admin user ID
            }
          });
        } catch (error) {
          toast({ title: "Error", description: "Invalid JSON in settings field", variant: "destructive" });
        }
        break;
    }
  };

  const handleInputChange = (field: string, value: any) => {
    if (!editingItem) return;
    setEditingItem({
      ...editingItem,
      formData: {
        ...editingItem.formData,
        [field]: value
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Management System</h1>
          <p className="text-gray-600">Manage your website content, navigation, and components</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pages" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Pages
            </TabsTrigger>
            <TabsTrigger value="navigation" className="flex items-center gap-2">
              <Navigation className="w-4 h-4" />
              Navigation
            </TabsTrigger>
            <TabsTrigger value="components" className="flex items-center gap-2">
              <Layout className="w-4 h-4" />
              Components
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Pages Tab */}
          <TabsContent value="pages" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Page Contents</h2>
                {pagesLoading ? (
                  <div className="text-center py-8">Loading pages...</div>
                ) : (
                  <div className="space-y-3">
                    {pages.map((page: PageContent) => (
                      <Card key={page.pageKey} className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">{page.title}</h3>
                              <p className="text-sm text-gray-500">Key: {page.pageKey}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={page.isActive ? "default" : "secondary"}>
                                {page.isActive ? "Active" : "Inactive"}
                              </Badge>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditPage(page)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              {editingItem && editingItem.type === 'page' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Edit Page: {editingItem.data.title}</h2>
                  <Card>
                    <CardContent className="p-4 space-y-4">
                      <div>
                        <Label htmlFor="page-title">Title</Label>
                        <Input
                          id="page-title"
                          value={editingItem.formData.title}
                          onChange={(e) => handleInputChange('title', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="page-content">Content (JSON)</Label>
                        <Textarea
                          id="page-content"
                          rows={15}
                          value={editingItem.formData.content}
                          onChange={(e) => handleInputChange('content', e.target.value)}
                          className="font-mono text-sm"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={editingItem.formData.isActive}
                          onCheckedChange={(checked) => handleInputChange('isActive', checked)}
                        />
                        <Label>Active</Label>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleSave} disabled={updatePageMutation.isPending}>
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </Button>
                        <Button variant="outline" onClick={() => setEditingItem(null)}>
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Navigation Tab */}
          <TabsContent value="navigation" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Navigation Items</h2>
                {navLoading ? (
                  <div className="text-center py-8">Loading navigation...</div>
                ) : (
                  <div className="space-y-3">
                    {navigation.map((item: NavigationItem) => (
                      <Card key={item.id} className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">{item.label}</h3>
                              <p className="text-sm text-gray-500">{item.href}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline">{item.type}</Badge>
                                <Badge variant="outline">Pos: {item.position}</Badge>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {item.isVisible ? (
                                <Eye className="w-4 h-4 text-green-600" />
                              ) : (
                                <EyeOff className="w-4 h-4 text-gray-400" />
                              )}
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditNav(item)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => deleteNavMutation.mutate(item.id)}
                              >
                                <Trash2 className="w-4 h-4 text-red-600" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              {editingItem && editingItem.type === 'navigation' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Edit Navigation: {editingItem.data.label}</h2>
                  <Card>
                    <CardContent className="p-4 space-y-4">
                      <div>
                        <Label htmlFor="nav-label">Label</Label>
                        <Input
                          id="nav-label"
                          value={editingItem.formData.label}
                          onChange={(e) => handleInputChange('label', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="nav-href">URL/Href</Label>
                        <Input
                          id="nav-href"
                          value={editingItem.formData.href}
                          onChange={(e) => handleInputChange('href', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="nav-type">Type</Label>
                        <Input
                          id="nav-type"
                          value={editingItem.formData.type}
                          onChange={(e) => handleInputChange('type', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="nav-position">Position</Label>
                        <Input
                          id="nav-position"
                          type="number"
                          value={editingItem.formData.position}
                          onChange={(e) => handleInputChange('position', parseInt(e.target.value))}
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={editingItem.formData.isVisible}
                          onCheckedChange={(checked) => handleInputChange('isVisible', checked)}
                        />
                        <Label>Visible</Label>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleSave} disabled={updateNavMutation.isPending}>
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </Button>
                        <Button variant="outline" onClick={() => setEditingItem(null)}>
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Components Tab */}
          <TabsContent value="components" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Component Settings</h2>
                {componentsLoading ? (
                  <div className="text-center py-8">Loading components...</div>
                ) : (
                  <div className="space-y-3">
                    {components.map((component: ComponentSetting) => (
                      <Card key={component.componentKey} className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium capitalize">
                                {component.componentKey.replace('-', ' ')}
                              </h3>
                              <p className="text-sm text-gray-500">Key: {component.componentKey}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={component.isActive ? "default" : "secondary"}>
                                {component.isActive ? "Active" : "Inactive"}
                              </Badge>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditComponent(component)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              {editingItem && editingItem.type === 'component' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Edit Component: {editingItem.data.componentKey}</h2>
                  <Card>
                    <CardContent className="p-4 space-y-4">
                      <div>
                        <Label htmlFor="component-settings">Settings (JSON)</Label>
                        <Textarea
                          id="component-settings"
                          rows={15}
                          value={editingItem.formData.settings}
                          onChange={(e) => handleInputChange('settings', e.target.value)}
                          className="font-mono text-sm"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={editingItem.formData.isActive}
                          onCheckedChange={(checked) => handleInputChange('isActive', checked)}
                        />
                        <Label>Active</Label>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleSave} disabled={updateComponentMutation.isPending}>
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </Button>
                        <Button variant="outline" onClick={() => setEditingItem(null)}>
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>CMS Settings</CardTitle>
                <CardDescription>Configure general CMS settings and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-2">Cache Management</h3>
                      <p className="text-sm text-gray-600 mb-4">Clear cached content to see changes immediately</p>
                      <Button variant="outline" onClick={() => {
                        queryClient.invalidateQueries();
                        toast({ title: "Success", description: "Cache cleared successfully" });
                      }}>
                        Clear Cache
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-2">Backup & Export</h3>
                      <p className="text-sm text-gray-600 mb-4">Export your content for backup or migration</p>
                      <Button variant="outline" disabled>
                        Export Content
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}