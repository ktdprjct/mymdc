{ pkgs }: {
    deps = [
        pkgs.nodejs
        pkgs.nodePackages.typescript
        pkgs.ffmpeg
        pkgs.imagemagick
        pkgs.libwebp
        pkgs.python3
        pkgs.git
        pkgs.speedtest-cli
    ];
}
