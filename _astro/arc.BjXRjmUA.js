import{$ as ln,a0 as an,a1 as G,a2 as q,a3 as z,a4 as un,a5 as y,a6 as tn,a7 as K,a8 as _,a9 as rn,aa as o,ab as sn,ac as on,ad as fn}from"./mermaid.core.D2WQHxI7.js";function cn(n){return n.innerRadius}function yn(n){return n.outerRadius}function gn(n){return n.startAngle}function dn(n){return n.endAngle}function mn(n){return n&&n.padAngle}function pn(n,t,a,o,r,c,e,u){var i=a-n,l=o-t,f=e-r,s=u-c,p=s*i-f*l;if(!(p*p<y))return[n+(p=(f*(t-c)-s*(n-r))/p)*i,t+p*l]}function V(n,t,a,o,r,c,y){var e=n-a,u=t-o,i=(y?c:-c)/K(e*e+u*u),l=i*u,f=-i*e,s=n+l,p=t+f,x=a+l,h=o+f,d=(s+x)/2,g=(p+h)/2,v=x-s,m=h-p,q=v*v+m*m,z=r-c,G=s*h-x*p,T=(m<0?-1:1)*K(on(0,z*z*q-G*G)),A=(G*m-v*T)/q,R=(-G*v-m*T)/q,V=(G*m+v*T)/q,_=(-G*v+m*T)/q,b=A-d,j=R-g,D=V-d,H=_-g;return b*b+j*j>D*D+H*H&&(A=V,R=_),{cx:A,cy:R,x01:-l,y01:-f,x11:A*(r/z-1),y11:R*(r/z-1)}}function hn(){var n=cn,t=yn,a=z(0),r=null,c=gn,e=dn,u=mn,i=null,l=ln(f);function f(){var f,s,p=+n.apply(this,arguments),x=+t.apply(this,arguments),h=c.apply(this,arguments)-un,d=e.apply(this,arguments)-un,g=rn(d-h),v=d>h;if(i||(i=f=l()),x<p&&(s=x,x=p,p=s),x>y)if(g>tn-y)i.moveTo(x*G(h),x*q(h)),i.arc(0,0,x,h,d,!v),p>y&&(i.moveTo(p*G(d),p*q(d)),i.arc(0,0,p,d,h,v));else{var m,z,T=h,A=d,R=h,b=d,j=g,D=g,H=u.apply(this,arguments)/2,I=H>y&&(r?+r.apply(this,arguments):K(p*p+x*x)),P=_(rn(x-p)/2,+a.apply(this,arguments)),Q=P,W=P;if(I>y){var $=sn(I/p*q(H)),k=sn(I/x*q(H));(j-=2*$)>y?(R+=$*=v?1:-1,b-=$):(j=0,R=b=(h+d)/2),(D-=2*k)>y?(T+=k*=v?1:-1,A-=k):(D=0,T=A=(h+d)/2)}var w=x*G(T),B=x*q(T),C=p*G(b),E=p*q(b);if(P>y){var F,J=x*G(A),L=x*q(A),M=p*G(R),N=p*q(R);if(g<an)if(F=pn(w,B,M,N,J,L,C,E)){var O=w-F[0],S=B-F[1],U=J-F[0],X=L-F[1],Y=1/q(fn((O*U+S*X)/(K(O*O+S*S)*K(U*U+X*X)))/2),Z=K(F[0]*F[0]+F[1]*F[1]);Q=_(P,(p-Z)/(Y-1)),W=_(P,(x-Z)/(Y+1))}else Q=W=0}D>y?W>y?(m=V(M,N,w,B,x,W,v),z=V(J,L,C,E,x,W,v),i.moveTo(m.cx+m.x01,m.cy+m.y01),W<P?i.arc(m.cx,m.cy,W,o(m.y01,m.x01),o(z.y01,z.x01),!v):(i.arc(m.cx,m.cy,W,o(m.y01,m.x01),o(m.y11,m.x11),!v),i.arc(0,0,x,o(m.cy+m.y11,m.cx+m.x11),o(z.cy+z.y11,z.cx+z.x11),!v),i.arc(z.cx,z.cy,W,o(z.y11,z.x11),o(z.y01,z.x01),!v))):(i.moveTo(w,B),i.arc(0,0,x,T,A,!v)):i.moveTo(w,B),p>y&&j>y?Q>y?(m=V(C,E,J,L,p,-Q,v),z=V(w,B,M,N,p,-Q,v),i.lineTo(m.cx+m.x01,m.cy+m.y01),Q<P?i.arc(m.cx,m.cy,Q,o(m.y01,m.x01),o(z.y01,z.x01),!v):(i.arc(m.cx,m.cy,Q,o(m.y01,m.x01),o(m.y11,m.x11),!v),i.arc(0,0,p,o(m.cy+m.y11,m.cx+m.x11),o(z.cy+z.y11,z.cx+z.x11),v),i.arc(z.cx,z.cy,Q,o(z.y11,z.x11),o(z.y01,z.x01),!v))):i.arc(0,0,p,b,R,v):i.lineTo(C,E)}else i.moveTo(0,0);if(i.closePath(),f)return i=null,f+""||null}return f.centroid=function(){var a=(+n.apply(this,arguments)+ +t.apply(this,arguments))/2,o=(+c.apply(this,arguments)+ +e.apply(this,arguments))/2-an/2;return[G(o)*a,q(o)*a]},f.innerRadius=function(t){return arguments.length?(n="function"==typeof t?t:z(+t),f):n},f.outerRadius=function(n){return arguments.length?(t="function"==typeof n?n:z(+n),f):t},f.cornerRadius=function(n){return arguments.length?(a="function"==typeof n?n:z(+n),f):a},f.padRadius=function(n){return arguments.length?(r=null==n?null:"function"==typeof n?n:z(+n),f):r},f.startAngle=function(n){return arguments.length?(c="function"==typeof n?n:z(+n),f):c},f.endAngle=function(n){return arguments.length?(e="function"==typeof n?n:z(+n),f):e},f.padAngle=function(n){return arguments.length?(u="function"==typeof n?n:z(+n),f):u},f.context=function(n){return arguments.length?(i=n??null,f):i},f}export{hn as d};