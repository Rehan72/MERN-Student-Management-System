import React, { useState, useEffect } from 'react';
import { classApi, teacherApi } from '../api/managementApi';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from '../components/ui/table';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Building2,
  Loader2,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ClassManagement = () => {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    section: '',
    teacher_id: '',
    room: '',
    schedule: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [classesRes, teachersRes] = await Promise.all([
        classApi.getAll(),
        teacherApi.getAll()
      ]);
      setClasses(classesRes.data);
      setTeachers(teachersRes.data);
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (classData = null) => {
    if (classData) {
      setEditingClass(classData);
      setFormData({
        name: classData.name,
        section: classData.section,
        teacher_id: classData.teacher_id?._id || classData.teacher_id || '',
        room: classData.room || '',
        schedule: classData.schedule || ''
      });
    } else {
      setEditingClass(null);
      setFormData({
        name: '',
        section: '',
        teacher_id: '',
        room: '',
        schedule: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };
      if (payload.teacher_id === "") payload.teacher_id = null;

      if (editingClass) {
        await classApi.update(editingClass._id, payload);
      } else {
        await classApi.create(payload);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      console.error('Failed to save class', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      try {
        await classApi.delete(id);
        fetchData();
      } catch (error) {
        console.error('Failed to delete class', error);
      }
    }
  };

  const filteredClasses = classes.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.room?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Classes Management</h1>
          <p className="text-sm text-slate-500">Manage all academic classes and schedules.</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="bg-indigo-600 hover:bg-indigo-500">
          <Plus className="w-4 h-4 mr-2" /> Add Class
        </Button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-200 dark:border-white/10 flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search classes..." 
              className="pl-10" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class Name</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Teacher</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClasses.length > 0 ? (
                filteredClasses.map((c) => (
                  <TableRow key={c._id}>
                    <TableCell className="font-medium text-slate-900 dark:text-white">
                      {c.name}
                    </TableCell>
                    <TableCell>{c.section}</TableCell>
                    <TableCell>
                      <span className="font-medium text-indigo-600 dark:text-indigo-400">
                        {c.teacher_id?.name || 'Unassigned'}
                      </span>
                    </TableCell>
                    <TableCell>{c.room || 'N/A'}</TableCell>
                    <TableCell>{c.schedule || 'N/A'}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenModal(c)} className="hover:text-indigo-600">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(c._id)} className="hover:text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-slate-500">
                    No classes found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-indigo-500" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    {editingClass ? 'Edit Class' : 'Add New Class'}
                  </h2>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Class Name</label>
                    <Input 
                      required
                      placeholder="e.g. Mathematics" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Section</label>
                    <Input 
                      required
                      placeholder="e.g. A" 
                      value={formData.section}
                      onChange={(e) => setFormData({...formData, section: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Teacher</label>
                    <select 
                      className="w-full h-10 px-3 py-2 bg-transparent border border-slate-200 dark:border-white/10 rounded-md text-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
                      value={formData.teacher_id}
                      onChange={(e) => setFormData({...formData, teacher_id: e.target.value})}
                    >
                      <option value="">Select Teacher</option>
                      {teachers.map(t => (
                        <option key={t._id} value={t._id}>{t.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Room</label>
                    <Input 
                      placeholder="e.g. 101" 
                      value={formData.room}
                      onChange={(e) => setFormData({...formData, room: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Schedule</label>
                    <Input 
                      placeholder="e.g. Mon-Wed 10:00" 
                      value={formData.schedule}
                      onChange={(e) => setFormData({...formData, schedule: e.target.value})}
                    />
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <Button type="button" variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-500">
                    {editingClass ? 'Update Class' : 'Create Class'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClassManagement;
