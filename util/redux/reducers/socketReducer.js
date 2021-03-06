import io from 'socket.io-client';

export default (
  state = typeof window !== 'undefined'?
  io.connect(
    window.location.protocol+'//'
    +window.location.hostname+((window.location.port)?(':'+window.location.port):'')
  ):null,
  action
) => {
  switch (action.type) {
    case 'ADD_EVENT':
    if(state){
      state.on(action.eventName, (data)=>{
        action.cb(data)
      })
      return state;
    }
  }
  return state;
};
