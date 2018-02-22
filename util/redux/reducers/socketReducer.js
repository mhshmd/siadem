import io from 'socket.io-client';

export default (
  state = typeof window !== 'undefined'?
  io.connect(
    window.location.protocol+'//'
    +window.location.hostname+((window.location.port)?(':'+window.location.port):'')
  ):null,
  action
) => {
  return state;
};
