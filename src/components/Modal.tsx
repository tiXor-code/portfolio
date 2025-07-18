import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ProjectDetails } from '../types/projects';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  company: string;
  details: ProjectDetails | string;
  tags: string[];
  domain: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, company, details, tags, domain }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Handle both old string format and new object format
  const projectDetails = typeof details === 'string' ? null : details;
  
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'technical', label: 'Technical Details' },
    { id: 'impact', label: 'Impact & Results' },
    { id: 'gallery', label: 'Gallery' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-apple-gray-900 rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative p-8 pb-0">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-apple-blue text-sm font-medium mb-2">{company}</p>
                  <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
                  <div className="flex items-center gap-4 text-sm text-apple-gray-400">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {domain}
                    </span>
                    {projectDetails && (
                      <>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {projectDetails.timeline}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          {projectDetails.teamSize}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <button 
                  onClick={onClose} 
                  className="text-apple-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Tabs */}
              {projectDetails && (
                <div className="flex gap-1 border-b border-apple-gray-800">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-3 text-sm font-medium transition-all relative ${
                        activeTab === tab.id
                          ? 'text-white'
                          : 'text-apple-gray-400 hover:text-white'
                      }`}
                    >
                      {tab.label}
                      {activeTab === tab.id && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-apple-blue"
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-8 pt-6 overflow-y-auto max-h-[60vh]">
              {!projectDetails ? (
                // Fallback for old string format
                <p className="text-apple-gray-300">{String(details)}</p>
              ) : (
                <AnimatePresence mode="wait">
                  {activeTab === 'overview' && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      {/* Challenge */}
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                          <span className="text-2xl">🎯</span> The Challenge
                        </h3>
                        <p className="text-apple-gray-300 leading-relaxed">{projectDetails.challenge}</p>
                      </div>

                      {/* Role */}
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                          <span className="text-2xl">👤</span> My Role
                        </h3>
                        <p className="text-apple-gray-300 leading-relaxed">{projectDetails.role}</p>
                      </div>

                      {/* Approach */}
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                          <span className="text-2xl">💡</span> The Approach
                        </h3>
                        <p className="text-apple-gray-300 leading-relaxed">{projectDetails.approach}</p>
                      </div>

                      {/* Key Learnings */}
                      <div className="mt-6 p-6 bg-apple-blue/10 rounded-xl border border-apple-blue/20">
                        <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                          <span className="text-2xl">📚</span> Key Learnings
                        </h3>
                        <p className="text-apple-gray-300 leading-relaxed">{projectDetails.learnings}</p>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'technical' && (
                    <motion.div
                      key="technical"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      {/* Technologies */}
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                          <span className="text-2xl">🛠️</span> Technologies & Tools
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {projectDetails.technologies.map((tech, index) => (
                            <motion.span
                              key={tech}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.05 }}
                              className="px-4 py-2 bg-gradient-to-r from-apple-blue/20 to-purple-500/20 border border-apple-blue/30 rounded-lg text-sm font-medium text-white"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* Technical Implementation */}
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                          <span className="text-2xl">⚙️</span> Implementation Details
                        </h3>
                        <p className="text-apple-gray-300 leading-relaxed">{projectDetails.approach}</p>
                      </div>

                      {/* Tags */}
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                          <span className="text-2xl">🏷️</span> Skills Applied
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1.5 text-xs font-medium bg-apple-gray-800/50 text-apple-gray-300 rounded-full border border-apple-gray-700"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'impact' && (
                    <motion.div
                      key="impact"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      {/* Key Metrics */}
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                          <span className="text-2xl">📊</span> Key Metrics
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {Object.entries(projectDetails.metrics).map(([key, value], index) => (
                            <motion.div
                              key={key}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="bg-gradient-to-br from-apple-gray-800/50 to-apple-gray-800/30 p-4 rounded-xl border border-apple-gray-700"
                            >
                              <div className="text-2xl font-bold text-gradient mb-1">{value}</div>
                              <div className="text-xs text-apple-gray-400 capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Outcomes */}
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                          <span className="text-2xl">🎯</span> Outcomes & Achievements
                        </h3>
                        <ul className="space-y-3">
                          {projectDetails.outcomes.map((outcome, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start gap-3"
                            >
                              <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="text-apple-gray-300">{outcome}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'gallery' && (
                    <motion.div
                      key="gallery"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <span className="text-2xl">🖼️</span> Project Gallery
                      </h3>
                      {projectDetails.images && projectDetails.images.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {projectDetails.images.map((image, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 }}
                              className="relative aspect-video bg-apple-gray-800 rounded-lg overflow-hidden"
                            >
                              <img 
                                src={image} 
                                alt={`${title} screenshot ${index + 1}`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = `https://via.placeholder.com/800x450/1a1a1a/666?text=${encodeURIComponent(title + ' Image ' + (index + 1))}`;
                                }}
                              />
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12 text-apple-gray-500">
                          <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p>Gallery images coming soon</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;