-- Found here and slightly modified: https://gist.github.com/NoobsArePeople2/5121597
on is_running(appName)
    tell application "System Events" to (name of processes) contains appName
end is_running

if is_running("Music") then
    tell application "Music"
        playpause
    end tell
else
    tell application "Spotify"
        playpause
    end tell
end if