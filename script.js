// MUSIC PLAYER - by Lee Wilson

// select all the elements in the HTML page
// and assign them to a variable
let now_playing = document.querySelector(".now-playing")
let track_art = document.querySelector(".track-art")
let track_name = document.querySelector(".track-name")
let track_artist = document.querySelector(".track-artist")

let playpause_btn = document.querySelector(".playpause-track")
let next_btn = document.querySelector(".next-track")
let prev_btn = document.querySelector(".prev-track")

let seek_slider = document.querySelector(".seek_slider")
let volume_slider = document.querySelector(".volume_slider")
let curr_time = document.querySelector(".current-time")
let total_duration = document.querySelector(".total-duration")

// specify global vars
let track_index = 0
let isPlaying = false
let updateTimer

// create the audio element for the player
let curr_track = document.createElement('audio')

// define the list of tracks to be played
let track_list = [
    {
        name: "Between Red And Green",
        artist: "Lee J Wilson",
        image: "./images/BetweenRedAndGreen.jpg",
        path: "./songs/Between Red And Green.mp3"
    },
    {
        name: "Interlude",
        artist: "Lee J Wilson",
        image: "./images/Interlude.jpg",
        path: "./songs/Interlude.mp3"
    },
    {
        name: "Monorail",
        artist: "Lee J Wilson",
        image: "./images/Monorail.jpg",
        path: "./songs/Monorail.mp3",
    },
    {
        name: "Lava",
        artist: "Lee J Wilson",
        image: "./images/Lava.jpg",
        path: "./songs/Lava.mp3",
    },
];

// START - Load the first track in the tracklist
loadTrack(track_index)

function loadTrack(track_index) 
{
    // clear the previous seek timer
    // the clearInterval() method clears a timer set with the setInterval() method.
    clearInterval(updateTimer) 
    resetValues()

    // load a new track
    curr_track.src = track_list[track_index].path
    curr_track.load()

    // update details of the track
    track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")"
    track_name.textContent = track_list[track_index].name
    track_artist.textContent = track_list[track_index].artist
    now_playing.textContent = track_index + 1 + " / " + track_list.length

    // set an interval of 1000 milliseconds
    // for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000)

    // move to the next track if the current finishes playing
    // using the 'ended' event
    curr_track.addEventListener("ended", nextTrack)
}

// function to reset all values to their default
function resetValues() 
{
    curr_time.textContent = "00:00"
    total_duration.textContent = "00:00"
    seek_slider.value = 0
}

function playpauseTrack() 
{
    // toggle between playing and pausing
    // depending on the current state
    if (!isPlaying) 
        playTrack()
    else 
        pauseTrack()
}

function playTrack() 
{
    // play the current track
    curr_track.play()
    isPlaying = true

    // replace icon with the pause icon
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>'
}

function pauseTrack() 
{
    // pause the loaded track
    curr_track.pause()
    isPlaying = false

    // replace icon with the play icon
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>'
}

function nextTrack() 
{
    // go back to the first track if the
    // current one is the last in the track list
    if (track_index < track_list.length - 1)
        track_index++
    else 
        track_index = 0
    // load and play the new track
    loadTrack(track_index)
    playTrack()
}

function prevTrack()
{
    // go back to the last track if the
    // current one is the first in the track list
    if (track_index > 0)
        track_index--
    else 
        track_index = track_list.length - 1
    // Load and play the new track
    loadTrack(track_index)
    playTrack()
}

function seekTo() 
{
    // calculate the seek position by the
    // percentage of the seek slider 
    // and get the relative duration to the track
    seekto = curr_track.duration * (seek_slider.value / 100)

    // Set the current track position to the calculated seek position
    curr_track.currentTime = seekto
}

function setVolume() 
{
    // set the volume according to the
    // percentage of the volume slider set
    curr_track.volume = volume_slider.value / 100
}

function seekUpdate() 
{
    let seekPosition = 0

    // check if the current track duration is a legible number
    if (!isNaN(curr_track.duration)) 
    {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration)
        seek_slider.value = seekPosition

        // calculate the time left and the total duration
        let currentMinutes = Math.floor(curr_track.currentTime / 60)
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60)
        let durationMinutes = Math.floor(curr_track.duration / 60)
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60)

        // add a zero to the single digit time values
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes }

        // display the updated duration
        curr_time.textContent = currentMinutes + ":" + currentSeconds
        total_duration.textContent = durationMinutes + ":" + durationSeconds
    }
}
