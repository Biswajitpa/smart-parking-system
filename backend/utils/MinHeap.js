class MinHeap {
  constructor(){ this.heap=[]; }
  clear(){ this.heap=[]; }
  insert(v){ this.heap.push(v); this.up(); }
  up(){ let i=this.heap.length-1; while(i>0){ const p=Math.floor((i-1)/2); if(this.heap[p]<=this.heap[i]) break; [this.heap[p],this.heap[i]]=[this.heap[i],this.heap[p]]; i=p; } }
  extractMin(){ if(!this.heap.length) return null; if(this.heap.length===1) return this.heap.pop(); const m=this.heap[0]; this.heap[0]=this.heap.pop(); this.down(); return m; }
  down(){ let i=0; while(true){ const l=2*i+1,r=2*i+2; let s=i; if(l<this.heap.length&&this.heap[l]<this.heap[s]) s=l; if(r<this.heap.length&&this.heap[r]<this.heap[s]) s=r; if(s===i) break; [this.heap[i],this.heap[s]]=[this.heap[s],this.heap[i]]; i=s; } }
}
export default MinHeap;
