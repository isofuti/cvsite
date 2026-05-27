import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Award, ExternalLink, Eye, CheckCircle2, ChevronRight, FileText } from 'lucide-react';
import { certificatesData } from '../data/certificates';

export const CertificatesApp = () => {
  const { t, i18n } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeCertId, setActiveCertId] = useState(certificatesData[0]?.id || null);

  const categories = [
    { id: 'all', label: t('cert_all') },
    { id: 'Yandex', label: t('cert_yandex') },
    { id: 'VK', label: t('cert_vk') },
    { id: 'HubSpot', label: t('cert_hubspot') },
    { id: 'Brand Analytics', label: t('cert_brand_analytics') }
  ];

  const filteredCerts = selectedCategory === 'all'
    ? certificatesData
    : certificatesData.filter(c => c.issuer === selectedCategory);

  const activeCert = certificatesData.find(c => c.id === activeCertId);

  // Helper to get relative asset URL
  const getAssetUrl = (fileName) => {
    return `${import.meta.env.BASE_URL}certificates/${fileName}`;
  };

  const getIssuerBadgeColor = (issuer) => {
    switch (issuer) {
      case 'Yandex': return { bg: 'rgba(255, 204, 0, 0.15)', text: '#d4af37', border: 'rgba(255, 204, 0, 0.3)' };
      case 'VK': return { bg: 'rgba(0, 119, 255, 0.15)', text: '#0077ff', border: 'rgba(0, 119, 255, 0.3)' };
      case 'HubSpot': return { bg: 'rgba(255, 122, 89, 0.15)', text: '#ff7a59', border: 'rgba(255, 122, 89, 0.3)' };
      case 'Brand Analytics': return { bg: 'rgba(175, 82, 222, 0.15)', text: '#af52de', border: 'rgba(175, 82, 222, 0.3)' };
      default: return { bg: 'rgba(255, 255, 255, 0.1)', text: '#fff', border: 'rgba(255, 255, 255, 0.2)' };
    }
  };

  return (
    <div style={{ display: 'flex', height: '100%', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#eaeaea', background: '#1c1c1e' }}>
      {/* Sidebar / Filters & List */}
      <div style={{ width: '320px', borderRight: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', flexDirection: 'column', background: '#121214' }}>
        {/* Category Selector */}
        <div style={{ padding: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none' }} className="no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  // Auto-select first in filtered list if active is filtered out
                  const newFiltered = cat.id === 'all'
                    ? certificatesData
                    : certificatesData.filter(c => c.issuer === cat.id);
                  if (newFiltered.length > 0 && !newFiltered.some(c => c.id === activeCertId)) {
                    setActiveCertId(newFiltered[0].id);
                  }
                }}
                style={{
                  padding: '6px 12px',
                  borderRadius: '16px',
                  border: 'none',
                  background: selectedCategory === cat.id ? '#007aff' : 'rgba(255, 255, 255, 0.08)',
                  color: '#fff',
                  fontSize: '12px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'background 0.2s'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Certificate List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 8px' }}>
          {filteredCerts.map(cert => {
            const badge = getIssuerBadgeColor(cert.issuer);
            const isActive = cert.id === activeCertId;
            return (
              <div
                key={cert.id}
                onClick={() => setActiveCertId(cert.id)}
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  background: isActive ? 'rgba(0, 122, 255, 0.15)' : 'transparent',
                  border: isActive ? '1px solid rgba(0, 122, 255, 0.3)' : '1px solid transparent',
                  cursor: 'pointer',
                  marginBottom: '8px',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
                className="cert-list-item"
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: badge.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Award size={20} color={badge.text} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: isActive ? '#fff' : '#eaeaea',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {i18n.language === 'ru' ? cert.titleRu : cert.titleEn}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                    <span style={{
                      fontSize: '11px',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: badge.bg,
                      color: badge.text,
                      border: `1px solid ${badge.border}`,
                      fontWeight: 500
                    }}>
                      {cert.issuer}
                    </span>
                    {cert.credentialId && (
                      <span style={{ fontSize: '11px', color: '#8e8e93' }}>
                        #{cert.credentialId}
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRight size={16} color={isActive ? '#007aff' : '#555'} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Details Panel */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#1c1c1e', overflowY: 'auto' }}>
        {activeCert ? (
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', minHeight: '100%' }}>
            {/* Header info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '16px' }}>
              <div>
                <span style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  color: getIssuerBadgeColor(activeCert.issuer).text,
                  letterSpacing: '0.5px'
                }}>
                  {activeCert.issuer} {t('certificates_title')}
                </span>
                <h1 style={{ fontSize: '20px', fontWeight: 700, margin: '6px 0 0 0', color: '#fff', lineHeight: 1.3 }}>
                  {i18n.language === 'ru' ? activeCert.titleRu : activeCert.titleEn}
                </h1>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                {activeCert.verificationUrl && (
                  <a
                    href={activeCert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      padding: '8px 14px',
                      fontSize: '12px',
                      fontWeight: 500,
                      color: '#fff',
                      textDecoration: 'none',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'}
                  >
                    <ExternalLink size={14} />
                    {t('cert_verify')}
                  </a>
                )}
                <a
                  href={getAssetUrl(activeCert.file)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: '#007aff',
                    borderRadius: '8px',
                    padding: '8px 14px',
                    fontSize: '12px',
                    fontWeight: 500,
                    color: '#fff',
                    textDecoration: 'none',
                    transition: 'opacity 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  <Eye size={14} />
                  {t('cert_download')}
                </a>
              </div>
            </div>

            {/* Metainfo grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '16px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '12px',
              padding: '16px'
            }}>
              <div>
                <div style={{ fontSize: '11px', color: '#8e8e93', textTransform: 'uppercase', fontWeight: 600 }}>{t('cert_issuer')}</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={14} color="#34c759" />
                  {activeCert.issuer}
                </div>
              </div>
              {activeCert.credentialId && (
                <div>
                  <div style={{ fontSize: '11px', color: '#8e8e93', textTransform: 'uppercase', fontWeight: 600 }}>{t('cert_id')}</div>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: '#eaeaea', marginTop: '4px', fontFamily: 'monospace' }}>
                    {activeCert.credentialId}
                  </div>
                </div>
              )}
              <div>
                <div style={{ fontSize: '11px', color: '#8e8e93', textTransform: 'uppercase', fontWeight: 600 }}>{t('cert_valid')}</div>
                <div style={{ fontSize: '14px', fontWeight: 500, color: '#eaeaea', marginTop: '4px' }}>
                  {activeCert.validUntil}
                </div>
              </div>
            </div>

            {/* Embedded Preview */}
            <div style={{
              flex: 1,
              background: '#0d0d0f',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '12px',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              minHeight: '380px'
            }}>
              {activeCert.type === 'pdf' ? (
                <iframe
                  src={`${getAssetUrl(activeCert.file)}#toolbar=0`}
                  width="100%"
                  height="100%"
                  style={{ border: 'none', background: '#0d0d0f' }}
                  title={activeCert.titleEn}
                />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyItems: 'center', padding: '16px', overflow: 'auto' }}>
                  <img
                    src={getAssetUrl(activeCert.file)}
                    alt={activeCert.titleEn}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '420px',
                      display: 'block',
                      margin: '0 auto',
                      borderRadius: '6px',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                      objectFit: 'contain'
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', color: '#8e8e93' }}>
            <Award size={48} style={{ opacity: 0.3 }} />
            <div style={{ fontSize: '14px' }}>{t('cert_preview_placeholder')}</div>
          </div>
        )}
      </div>
    </div>
  );
};
