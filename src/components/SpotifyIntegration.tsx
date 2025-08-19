import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Music, Play, Pause, ExternalLink } from "lucide-react";

interface SpotifyIntegrationProps {
  playlistId: string;
  collectionName: string;
  artworkTitle?: string;
}

const SpotifyIntegration = ({ playlistId, collectionName, artworkTitle }: SpotifyIntegrationProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // Note: Actual Spotify Web Playback SDK integration would go here
    // For now, this is a UI demonstration
  };

  const openSpotify = () => {
    window.open(`https://open.spotify.com/playlist/${playlistId}`, '_blank');
  };

  return (
    <Card className="bg-gradient-to-r from-green-500/10 to-green-600/10 border-green-500/20">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className={`w-10 h-10 rounded-full bg-green-500 flex items-center justify-center ${isPlaying ? 'animate-pulse' : ''}`}>
                <Music className="h-5 w-5 text-white" />
              </div>
              {isPlaying && (
                <div className="absolute -inset-1 rounded-full border-2 border-green-500 animate-ping"></div>
              )}
            </div>
            
            <div>
              <p className="font-medium text-sm">
                {artworkTitle ? `Music for "${artworkTitle}"` : `${collectionName} Playlist`}
              </p>
              <p className="text-xs text-muted-foreground">
                Curated playlist to enhance your viewing experience
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handlePlayPause}
              className="h-8 w-8 p-0"
            >
              {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            </Button>
            
            <Button
              size="sm"
              variant="secondary"
              onClick={openSpotify}
              className="h-8"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Spotify
            </Button>
          </div>
        </div>
        
        {isPlaying && (
          <div className="mt-3 pt-3 border-t border-green-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-700">
                Now Playing
              </Badge>
              <span className="text-xs text-muted-foreground">
                Sample Track from {collectionName}
              </span>
            </div>
            <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full animate-pulse" style={{ width: '40%' }}></div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SpotifyIntegration;