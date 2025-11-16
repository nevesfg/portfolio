'use client';

import { useState, useEffect } from 'react';
import styles from './ProfileStatus.module.css';

interface Badge {
  name: string;
  emoji: string;
  color: string;
  isImage?: boolean;
}

interface LanyardData {
  success: boolean;
  data: {
    discord_user: {
      id: string;
      username: string;
      avatar: string;
      discriminator: string;
      bot: boolean;
      global_name: string | null;
      avatar_decoration_data: any;
      display_name: string;
      display_name_styles?: {
        colors: number[];
        effect_id: number;
        font_id: number;
      };
      public_flags: number;
      clan?: {
        identity_guild_id: string;
        identity_enabled: boolean;
        tag: string;
        badge: string;
      } | null;
      primary_guild?: {
        tag: string;
        identity_guild_id: string;
        badge: string;
        identity_enabled: boolean;
      };
      collectibles?: {
        nameplate?: {
          label: string;
          sku_id: string;
          asset: string;
          expires_at: string | null;
          palette: string;
        };
      };
    };
    discord_status: 'online' | 'idle' | 'dnd' | 'offline';
    activities: Array<{
      id: string;
      name: string;
      type: number;
      state?: string;
      details?: string;
      timestamps?: {
        start?: number;
        end?: number;
      };
      emoji?: {
        name: string;
        id?: string;
        animated?: boolean;
      };
      party?: any;
      assets?: {
        large_image?: string;
        large_text?: string;
        small_image?: string;
        small_text?: string;
      };
      secrets?: any;
      instance?: boolean;
      flags?: number;
    }>;
    listening_to_spotify: boolean;
    spotify?: {
      track_id: string;
      timestamps: {
        start: number;
        end: number;
      };
      album: string;
      album_art_url: string;
      artist: string;
      song: string;
    };
    kv: Record<string, string>;
  };
}

export default function ProfileStatus() {
  const [lanyardData, setLanyardData] = useState<LanyardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const DISCORD_USER_ID = '625828665791348758';

  useEffect(() => {
    const fetchLanyardData = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`, {
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
          }
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
          setLanyardData(data);
          setError(null);
        } else {
          throw new Error('API returned success: false');
        }
      } catch (err) {
        console.error('Lanyard API error:', err);
        
        if (err instanceof Error) {
          if (err.name === 'AbortError') {
            setError('Timeout ao conectar com Discord');
          } else if (err.message.includes('Failed to fetch')) {
            setError('Sem conexão com a internet');
          } else {
            setError('Erro ao carregar status do Discord');
          }
        } else {
          setError('Erro desconhecido');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLanyardData();
    
    const interval = setInterval(fetchLanyardData, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return '#23a55a';
      case 'idle': return '#f0b232';
      case 'dnd': return '#f23f43';
      case 'offline': return '#80848e';
      default: return '#80848e';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'Online';
      case 'idle': return 'Ausente';
      case 'dnd': return 'Não Perturbar';
      case 'offline': return 'Offline';
      default: return 'Desconhecido';
    }
  };

  const formatTimestamp = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `há ${days} dia${days > 1 ? 's' : ''}`;
    if (hours > 0) return `há ${hours} hora${hours > 1 ? 's' : ''}`;
    if (minutes > 0) return `há ${minutes} minuto${minutes > 1 ? 's' : ''}`;
    return 'agora mesmo';
  };

  // Função para obter badges baseadas nas public_flags
  const getBadges = (publicFlags: number): Badge[] => {
    const badges: Badge[] = [];
    
    // Discord Employee (Staff)
    if (publicFlags & (1 << 0)) badges.push({ name: 'Discord Staff', emoji: '/assets/badges/staff.png', color: '#5865f2', isImage: true });
    // Partnered Server Owner
    if (publicFlags & (1 << 1)) badges.push({ name: 'Partnered Server Owner', emoji: '/assets/badges/partner.png', color: '#5865f2', isImage: true });
    // HypeSquad Events
    if (publicFlags & (1 << 2)) badges.push({ name: 'HypeSquad Events', emoji: '/assets/badges/hypesquad_events.png', color: '#f47b67', isImage: true });
    // Bug Hunter Level 1
    if (publicFlags & (1 << 3)) badges.push({ name: 'Bug Hunter Level 1', emoji: '/assets/badges/bug_hunter.png', color: '#4e5d94', isImage: true });
    // House Bravery
    if (publicFlags & (1 << 6)) badges.push({ name: 'HypeSquad Bravery', emoji: '/assets/badges/hypesquad_bravery.png', color: '#9c84ef', isImage: true });
    // House Brilliance
    if (publicFlags & (1 << 7)) badges.push({ name: 'HypeSquad Brilliance', emoji: '/assets/badges/hypesquad_brilliance.png', color: '#f9ca24', isImage: true });
    // House Balance
    if (publicFlags & (1 << 8)) badges.push({ name: 'HypeSquad Balance', emoji: '/assets/badges/hypesquad_balance.png', color: '#45aaf2', isImage: true });
    // Early Supporter
    if (publicFlags & (1 << 9)) badges.push({ name: 'Early Supporter', emoji: '/assets/badges/early_supporter.png', color: '#f47b67', isImage: true });
    // Bug Hunter Level 2
    if (publicFlags & (1 << 14)) badges.push({ name: 'Bug Hunter Level 2', emoji: '/assets/badges/bug_hunter.png', color: '#f9ca24', isImage: true });
    // Active Developer
    if (publicFlags & (1 << 22)) badges.push({ name: 'Active Developer', emoji: '/assets/badges/active_developer.png', color: '#5865f2', isImage: true });
    // Verified Bot Developer
    if (publicFlags & (1 << 17)) badges.push({ name: 'Early Verified Bot Developer', emoji: '/assets/badges/early_verified_bot_developer.png', color: '#5865f2', isImage: true });
    // Certified Moderator
    if (publicFlags & (1 << 18)) badges.push({ name: 'Certified Moderator', emoji: '/assets/badges/certified_moderator.png', color: '#5865f2', isImage: true });
    
    return badges;
  };

  // Função para obter badge de Nitro baseada em informações adicionais
  const getNitroBadge = (user: any): Badge | null => {
    // Se o usuário tem avatar animado, provavelmente tem Nitro
    if (user.avatar && user.avatar.startsWith('a_')) {
      return { name: 'Nitro Subscriber', emoji: '/assets/badges/nitro.png', color: '#f47b67', isImage: true };
    }
    return null;
  };

  // Função para obter badge de Server Booster baseada em informações do servidor
  const getBoosterBadge = (user: any): Badge | null => {
    // Detectar se é booster baseado em:
    // 1. Avatar decoration (decorações são geralmente de boosters)
    // 2. Display name styles (cores especiais são de boosters)
    // 3. Nameplate especial
    
    const hasAvatarDecoration = user.avatar_decoration_data !== null;
    const hasSpecialNameStyles = user.display_name_styles && user.display_name_styles.colors && user.display_name_styles.colors.length > 0;
    const hasNameplate = user.collectibles?.nameplate;
    
    if (hasAvatarDecoration || hasSpecialNameStyles || hasNameplate) {
      // Determinar nível de boost baseado nas características
      let boosterLevel = 1;
      
      // Se tem múltiplas cores no nome, provavelmente é booster de nível mais alto
      if (hasSpecialNameStyles && user.display_name_styles.colors.length > 1) {
        boosterLevel = Math.min(user.display_name_styles.colors.length, 9);
      }
      
      // Se tem nameplate, provavelmente é booster de nível médio/alto
      if (hasNameplate) {
        boosterLevel = Math.max(boosterLevel, 9);
      }
      
      // Se tem avatar decoration, provavelmente é booster de nível alto
      if (hasAvatarDecoration) {
        boosterLevel = Math.max(boosterLevel, 6);
      }
      
      return { 
        name: `Server Booster Level ${boosterLevel}`, 
        emoji: `/assets/badges/booster_level_${boosterLevel}.png`, 
        color: '#f47b67', 
        isImage: true 
      };
    }
    
    return null;
  };

  if (loading) {
    return (
      <div className={styles.discordCard}>
        <div className={styles.loadingState}>
          <div className={styles.loadingSpinner}></div>
          <span>Carregando status do Discord...</span>
        </div>
      </div>
    );
  }

  if (error || !lanyardData) {
    return (
      <div className={styles.discordCard}>
        <div className={styles.cardHeader}>
          <div className={styles.discordLogo}>
            <svg width="16" height="16" viewBox="0 0 127.14 96.36">
              <path fill="#5865f2" d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
            </svg>
          </div>
          <span className={styles.cardTitle}>Discord</span>
        </div>
        <div className={styles.errorState}>
          <div className={styles.errorIcon}>⚠️</div>
          <div className={styles.errorText}>
            <div className={styles.errorTitle}>Status indisponível</div>
            <div className={styles.errorMessage}>{error || 'Erro ao conectar'}</div>
          </div>
        </div>
      </div>
    );
  }

  const { discord_user, discord_status, activities, listening_to_spotify, spotify } = lanyardData.data;
  const avatarUrl = `https://cdn.discordapp.com/avatars/${discord_user.id}/${discord_user.avatar}.png?size=128`;

  // Encontrar atividade principal (não Spotify)
  const mainActivity = activities.find(activity => activity.type !== 2);

  return (
    <div className={styles.discordCard}>
      <div className={styles.cardHeader}>
        <div className={styles.discordLogo}>
          <svg width="16" height="16" viewBox="0 0 127.14 96.36">
            <path fill="#5865f2" d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
          </svg>
        </div>
        <span className={styles.cardTitle}>Discord</span>
      </div>

      <div className={styles.userInfo}>
        <div className={styles.avatarContainer}>
          <img 
            src={avatarUrl} 
            alt={discord_user.display_name || discord_user.username}
            className={styles.avatar}
          />
          <div 
            className={styles.statusIndicator}
            style={{ backgroundColor: getStatusColor(discord_status) }}
          ></div>
        </div>

        <div className={styles.userDetails}>
          <div className={styles.username}>
            {discord_user.display_name || discord_user.global_name || discord_user.username}
          </div>
          <div className={styles.discriminator}>
            {discord_user.username}
          </div>
          <div className={styles.status}>
            {getStatusText(discord_status)}
          </div>
        </div>
      </div>

      {/* Badges */}
      {(() => {
        const badges = getBadges(discord_user.public_flags);
        const nitroBadge = getNitroBadge(discord_user);
        const boosterBadge = getBoosterBadge(discord_user);
        const hasNameplate = discord_user.collectibles?.nameplate;
        
        if (badges.length > 0 || nitroBadge || boosterBadge || hasNameplate) {
          return (
            <div className={styles.badgesSection}>
              {/* <div className={styles.badgesHeader}>Badges</div> */}
              <div className={styles.badges}>
                {/* Public Flags Badges */}
                {badges.map((badge, index) => (
                  <div key={index} className={styles.badge} title={badge.name}>
                    {badge.isImage ? (
                      <img 
                        src={badge.emoji}
                        alt={badge.name}
                        className={styles.badgeImage}
                      />
                    ) : (
                      <span className={styles.badgeEmoji}>{badge.emoji}</span>
                    )}
                  </div>
                ))}

                {/* Nitro Badge */}
                {nitroBadge && (
                  <div className={styles.badge} title={nitroBadge.name}>
                    <img 
                      src={nitroBadge.emoji}
                      alt={nitroBadge.name}
                      className={styles.badgeImage}
                    />
                  </div>
                )}

                {/* Server Booster Badge */}
                {boosterBadge && (
                  <div className={styles.badge} title={boosterBadge.name}>
                    <img 
                      src={boosterBadge.emoji}
                      alt={boosterBadge.name}
                      className={styles.badgeImage}
                    />
                  </div>
                )}
                
                {/* Nameplate */}
                {/* {hasNameplate && (
                  <div className={styles.badge} title={discord_user.collectibles?.nameplate?.label}>
                    <div className={styles.nameplateBadge}>
                      <span className={styles.nameplateText}>🎨</span>
                    </div>
                  </div>
                )} */}
              </div>
            </div>
          );
        }
        return null;
      })()}

      {/* Atividade Principal */}
      {/* {mainActivity && (
        <div className={styles.activity}>
          <div className={styles.activityHeader}>
            {mainActivity.type === 0 && 'Jogando'}
            {mainActivity.type === 1 && 'Transmitindo'}
            {mainActivity.type === 3 && 'Assistindo'}
            {mainActivity.type === 5 && 'Competindo em'}
          </div>
          <div className={styles.activityName}>{mainActivity.name}</div>
          {mainActivity.details && (
            <div className={styles.activityDetails}>{mainActivity.details}</div>
          )}
          {mainActivity.state && (
            <div className={styles.activityState}>{mainActivity.state}</div>
          )}
        </div>
      )} */}

      {/* Spotify */}
      {listening_to_spotify && spotify && (
        <div className={styles.spotify}>
          <div className={styles.spotifyHeader}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#1db954">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            Ouvindo no Spotify
          </div>
          <div className={styles.spotifyTrack}>{spotify.song}</div>
          <div className={styles.spotifyArtist}>por {spotify.artist}</div>
        </div>
      )}

      {/* Status Offline com última vez online */}
      {/* {discord_status === 'offline' && (
        <div className={styles.offlineInfo}>
          <span>Última vez online {formatTimestamp(Date.now() - 86400000)}</span>
        </div>
      )} */}
    </div>
  );
}
