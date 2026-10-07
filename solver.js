/* Exact series RLC solution; SI units, peak-amplitude phasors. */
(function(root){
function solve(p,t){
 const {R,L,C,E,theta,i0,v0}=p,w=p.f*2*Math.PI,a=R/(2*L),w0=1/Math.sqrt(L*C),q=theta*Math.PI/180;
 const X=w*L-1/(w*C),den=R*R+X*X;
 let forced;
 if(R===0 && Math.abs(w-w0)<1e-10*w0){
  forced=t=>{let s=Math.sin(w*t+q),c=Math.cos(w*t+q);return [E*w*t*s/2,C*E*w*(s+w*t*c)/2]};
 }else{
  const re=E*(R*Math.cos(q)+X*Math.sin(q))/den,im=E*(R*Math.sin(q)-X*Math.cos(q))/den;
  forced=t=>{let c=Math.cos(w*t),s=Math.sin(w*t);return [(re*s+im*c)/(w*C),re*c-im*s]};
 }
 const [vf0,if0]=forced(0),A=v0-vf0,d=(i0-if0)/C,disc=a*a-w0*w0;
 let vn,dvn;
 if(Math.abs(disc)<1e-12*w0*w0){let B=d+a*A,z=Math.exp(-a*t);vn=(A+B*t)*z;dvn=(B-a*(A+B*t))*z}
 else if(disc<0){let b=Math.sqrt(-disc),B=(d+a*A)/b,c=Math.cos(b*t),s=Math.sin(b*t),z=Math.exp(-a*t);vn=z*(A*c+B*s);dvn=z*((-a*A+b*B)*c+(-a*B-b*A)*s)}
 else{let b=Math.sqrt(disc),r1=-w0*w0/(a+b),r2=-a-b,B=(d-r2*A)/(r1-r2),D=A-B;vn=B*Math.exp(r1*t)+D*Math.exp(r2*t);dvn=r1*B*Math.exp(r1*t)+r2*D*Math.exp(r2*t)}
 const [vf,iforced]=forced(t),i=C*dvn+iforced,v=vn+vf,e=E*Math.cos(w*t+q);
 return {t,i,v,in:C*dvn,if:iforced,vn,vf,e,vR:R*i,vL:e-R*i-v,W:(L*i*i+C*v*v)/2};
}
function parameters(p){const a=p.R/(2*p.L),w0=1/Math.sqrt(p.L*p.C);return {a,w0,z:a/w0,wd:Math.sqrt(Math.max(0,w0*w0-a*a)),rc:2*Math.sqrt(p.L/p.C),f0:w0/(2*Math.PI)}}
const api={solve,parameters};if(typeof module!=='undefined')module.exports=api;else root.RLC=api;
})(globalThis);
