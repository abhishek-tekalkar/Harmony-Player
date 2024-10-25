import { useRef, useState } from 'react';

function App() {
  const [currentMusicDetails, setCurrentMusicDetails] = useState({
    songName: 'Heeriye',
    songArtist: 'Arjit Singh',
    songSrc: './Assets/songs/song1.mp3',
    songAvatar: './Assets/Images/image1.jpg'
  });

  const [audioProgress, setAudioProgress] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [musicIndex, setMusicIndex] = useState(0);
  const [musicTotalLength, setMusicTotalLength] = useState('04 : 38');
  const [musicCurrentTime, setMusicCurrentTime] = useState('00 : 00');
  const [avatarClassIndex, setAvatarClassIndex] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);

  const currentAudio = useRef();
  const avatarClass = ['objectFitCover', 'objectFitContain', 'none'];
  const vidArray = ['./Assets/Videos/video3.mp4', './Assets/Videos/video2.mp4', './Assets/Videos/video1.mp4'];

  const musicAPI = [
    {
      songName: 'Heeriye',
      songArtist: 'Arjit Singh',
      songSrc: './Assets/songs/song1.mp3',
      songAvatar: './Assets/Images/image1.jpg'
    },
    {
      songName: 'Brazillian-Phonk Mano',
      songArtist: 'Sloboy, Lucafs',
      songSrc: './Assets/songs/song2.mp3',
      songAvatar: './Assets/Images/image2.jpg'
    },
    {
      songName: 'Maan Meri Jaan',
      songArtist: 'King',
      songSrc: './Assets/songs/song3.mp3',
      songAvatar: './Assets/Images/image3.jpg'
    },
    {
      songName: 'O Sajani Re',
      songArtist: 'Arjit Singh',
      songSrc: './Assets/songs/song4.mp3',
      songAvatar: './Assets/Images/image4.jpg'
    },
    {
      songName: 'One Direction Of My Life',
      songArtist: 'One Direction',
      songSrc: './Assets/songs/song5.mp3',
      songAvatar: './Assets/Images/image5.jpg'
    },
    {
      songName: 'See You Again',
      songArtist: 'Paul Walker',
      songSrc: './Assets/songs/song6.mp3',
      songAvatar: './Assets/Images/image6.jpg'
    },
    {
      songName: 'Pehele Bhi Mai',
      songArtist: 'Vishal Mishra',
      songSrc: './Assets/songs/song7.mp3',
      songAvatar: './Assets/Images/image7.jpg'
    },
    {
      songName: 'Summertime Sadness',
      songArtist: 'Lana Del Rey',
      songSrc: './Assets/songs/song8.mp3',
      songAvatar: './Assets/Images/image8.jpg'
    },
    {
      songName: 'Waka Waka',
      songArtist: 'Shakira',
      songSrc: './Assets/songs/song9.mp3',
      songAvatar: './Assets/Images/image9.jpg'
    },
    {
      songName: 'Yimmy Yimmy',
      songArtist: 'Tayc',
      songSrc: './Assets/songs/song10.mp3',
      songAvatar: './Assets/Images/image10.jpg'
    },
    {
      songName: 'Runway',
      songArtist: 'Aurora',
      songSrc: './Assets/songs/song11.mp3',
      songAvatar: './Assets/Images/image11.jpg'
    }
  ];

  // Handle changing avatar style
  const handleAvatar = () => setAvatarClassIndex((avatarClassIndex + 1) % avatarClass.length);

  // Toggle Play and Pause
  const handleAudioPlay = () => {
    if (currentAudio.current.paused) {
      currentAudio.current.play();
    } else {
      currentAudio.current.pause();
    }
    setIsAudioPlaying(!isAudioPlaying);
  };

  // Change song based on direction (next or previous)
  const changeSong = (direction) => {
    let newIndex = (musicIndex + direction + musicAPI.length) % musicAPI.length;
    if (newIndex < 0) newIndex = musicAPI.length - 1;  // Ensure newIndex wraps correctly to the last song if negative.
    setMusicIndex(newIndex);
    updateCurrentMusicDetails(newIndex);
  };

  const handleMusicProgressBar = (e) => {
    const progress = e.target.value;
    setAudioProgress(progress);
    currentAudio.current.currentTime = (progress * currentAudio.current.duration) / 100;
  };

  const updateCurrentMusicDetails = (index) => {
    const musicObject = musicAPI[index];
    currentAudio.current.src = musicObject.songSrc;
    setCurrentMusicDetails(musicObject);
    currentAudio.current.play();
    setIsAudioPlaying(true);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes} : ${secs}`;
  };

  const handleAudioUpdate = () => {
    setMusicTotalLength(formatTime(currentAudio.current.duration));
    setMusicCurrentTime(formatTime(currentAudio.current.currentTime));
    setAudioProgress((currentAudio.current.currentTime / currentAudio.current.duration) * 100 || 0);
  };

  const handleChangeBackground = () => setVideoIndex((videoIndex + 1) % vidArray.length);

  return (
    <div className="min-h-screen min-w-full flex justify-center items-center text-white font-poppins relative">
      <audio
        src='./Assets/songs/song1.mp3'
        ref={currentAudio}
        onEnded={() => changeSong(1)}
        onTimeUpdate={handleAudioUpdate}
      />
      <video src={vidArray[videoIndex]} loop muted autoPlay className='absolute inset-0 w-full h-screen object-cover filter saturate-150' />
      <div className="absolute inset-0 bg-black bg-opacity-20 pointer-events-none" />
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-lg p-8 w-96 flex flex-col items-center">
        <p className='text-lg mb-2 text-gray-300'>Harmony Player</p>
        <p className='text-2xl'>{currentMusicDetails.songName}</p>
        <p className='text-lg text-gray-400 mb-2'>{currentMusicDetails.songArtist}</p>
        <img
          src={currentMusicDetails.songAvatar}
          className={`rounded-full w-48 h-48 cursor-pointer animate-pulse ${avatarClass[avatarClassIndex]}`}
          onClick={handleAvatar}
          alt="song Avatar"
          id='songAvatar'
        />
        <div className="flex justify-between w-full font-semibold">
          <p>{musicCurrentTime}</p>
          <p>{musicTotalLength}</p>
        </div>
        <input
          type="range"
          name="musicProgressBar"
          className='w-full h-2 rounded-lg appearance-none bg-blue-200'
          value={audioProgress}
          onChange={handleMusicProgressBar}
        />
        <div className="flex items-center mt-4">
          <i className='fa-solid fa-backward text-white text-2xl cursor-pointer' onClick={() => changeSong(-1)} />
          <i className={`fa-solid ${isAudioPlaying ? 'fa-pause-circle' : 'fa-circle-play'} text-white text-4xl mx-4 cursor-pointer`} onClick={handleAudioPlay} />
          <i className='fa-solid fa-forward text-white text-2xl cursor-pointer' onClick={() => changeSong(1)} />
        </div>
      </div>
      <div className="bg-blue-300 bg-opacity-20 backdrop-blur-lg rounded-t-lg p-3 absolute bottom-0 left-1/2 transform -translate-x-1/2 transition duration-300 cursor-pointer text-center font-semibold text-white" onClick={handleChangeBackground}>
        Change Background
      </div>
    </div>
  );
}

export default App;
