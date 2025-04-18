import{aq as N,ar as j,as as f,at as b,au as E}from"./mermaid.core.D2WQHxI7.js";import{a as v,c as P,k as _,f as g,d,i as l,v as p,r as D}from"./_baseUniq.BAva7h_x.js";var w=N(function(o){return v(P(o,1,j,!0))}),F="\0",a="\0",O="";class L{constructor(e={}){this._isDirected=Object.prototype.hasOwnProperty.call(e,"directed")?e.directed:!0,this._isMultigraph=Object.prototype.hasOwnProperty.call(e,"multigraph")?e.multigraph:!1,this._isCompound=Object.prototype.hasOwnProperty.call(e,"compound")?e.compound:!1,this._label=void 0,this._defaultNodeLabelFn=f(void 0),this._defaultEdgeLabelFn=f(void 0),this._nodes={},this._isCompound&&(this._parent={},this._children={},this._children[a]={}),this._in={},this._preds={},this._out={},this._sucs={},this._edgeObjs={},this._edgeLabels={}}isDirected(){return this._isDirected}isMultigraph(){return this._isMultigraph}isCompound(){return this._isCompound}setGraph(e){return this._label=e,this}graph(){return this._label}setDefaultNodeLabel(e){return b(e)||(e=f(e)),this._defaultNodeLabelFn=e,this}nodeCount(){return this._nodeCount}nodes(){return _(this._nodes)}sources(){var e=this;return g(this.nodes(),function(t){return E(e._in[t])})}sinks(){var e=this;return g(this.nodes(),function(t){return E(e._out[t])})}setNodes(e,t){var s=arguments,i=this;return d(e,function(r){s.length>1?i.setNode(r,t):i.setNode(r)}),this}setNode(e,t){return Object.prototype.hasOwnProperty.call(this._nodes,e)?(arguments.length>1&&(this._nodes[e]=t),this):(this._nodes[e]=arguments.length>1?t:this._defaultNodeLabelFn(e),this._isCompound&&(this._parent[e]=a,this._children[e]={},this._children[a][e]=!0),this._in[e]={},this._preds[e]={},this._out[e]={},this._sucs[e]={},++this._nodeCount,this)}node(e){return this._nodes[e]}hasNode(e){return Object.prototype.hasOwnProperty.call(this._nodes,e)}removeNode(e){if(Object.prototype.hasOwnProperty.call(this._nodes,e)){var t=s=>this.removeEdge(this._edgeObjs[s]);delete this._nodes[e],this._isCompound&&(this._removeFromParentsChildList(e),delete this._parent[e],d(this.children(e),s=>{this.setParent(s)}),delete this._children[e]),d(_(this._in[e]),t),delete this._in[e],delete this._preds[e],d(_(this._out[e]),t),delete this._out[e],delete this._sucs[e],--this._nodeCount}return this}setParent(e,t){if(!this._isCompound)throw new Error("Cannot set parent in a non-compound graph");if(l(t))t=a;else{t+="";for(var s=t;!l(s);s=this.parent(s))if(s===e)throw new Error("Setting "+t+" as parent of "+e+" would create a cycle");this.setNode(t)}return this.setNode(e),this._removeFromParentsChildList(e),this._parent[e]=t,this._children[t][e]=!0,this}_removeFromParentsChildList(e){delete this._children[this._parent[e]][e]}parent(e){if(this._isCompound){var t=this._parent[e];if(t!==a)return t}}children(e){if(l(e)&&(e=a),this._isCompound){var t=this._children[e];if(t)return _(t)}else{if(e===a)return this.nodes();if(this.hasNode(e))return[]}}predecessors(e){var t=this._preds[e];if(t)return _(t)}successors(e){var t=this._sucs[e];if(t)return _(t)}neighbors(e){var t=this.predecessors(e);if(t)return w(t,this.successors(e))}isLeaf(e){var t;return this.isDirected()?t=this.successors(e):t=this.neighbors(e),t.length===0}filterNodes(e){var t=new this.constructor({directed:this._isDirected,multigraph:this._isMultigraph,compound:this._isCompound});t.setGraph(this.graph());var s=this;d(this._nodes,function(n,h){e(h)&&t.setNode(h,n)}),d(this._edgeObjs,function(n){t.hasNode(n.v)&&t.hasNode(n.w)&&t.setEdge(n,s.edge(n))});var i={};function r(n){var h=s.parent(n);return h===void 0||t.hasNode(h)?(i[n]=h,h):h in i?i[h]:r(h)}return this._isCompound&&d(t.nodes(),function(n){t.setParent(n,r(n))}),t}setDefaultEdgeLabel(e){return b(e)||(e=f(e)),this._defaultEdgeLabelFn=e,this}edgeCount(){return this._edgeCount}edges(){return p(this._edgeObjs)}setPath(e,t){var s=this,i=arguments;return D(e,function(r,n){return i.length>1?s.setEdge(r,n,t):s.setEdge(r,n),n}),this}setEdge(){var e,t,s,i,r=!1,n=arguments[0];typeof n=="object"&&n!==null&&"v"in n?(e=n.v,t=n.w,s=n.name,arguments.length===2&&(i=arguments[1],r=!0)):(e=n,t=arguments[1],s=arguments[3],arguments.length>2&&(i=arguments[2],r=!0)),e=""+e,t=""+t,l(s)||(s=""+s);var h=c(this._isDirected,e,t,s);if(Object.prototype.hasOwnProperty.call(this._edgeLabels,h))return r&&(this._edgeLabels[h]=i),this;if(!l(s)&&!this._isMultigraph)throw new Error("Cannot set a named edge when isMultigraph = false");this.setNode(e),this.setNode(t),this._edgeLabels[h]=r?i:this._defaultEdgeLabelFn(e,t,s);var u=M(this._isDirected,e,t,s);return e=u.v,t=u.w,Object.freeze(u),this._edgeObjs[h]=u,y(this._preds[t],e),y(this._sucs[e],t),this._in[t][h]=u,this._out[e][h]=u,this._edgeCount++,this}edge(e,t,s){var i=arguments.length===1?m(this._isDirected,arguments[0]):c(this._isDirected,e,t,s);return this._edgeLabels[i]}hasEdge(e,t,s){var i=arguments.length===1?m(this._isDirected,arguments[0]):c(this._isDirected,e,t,s);return Object.prototype.hasOwnProperty.call(this._edgeLabels,i)}removeEdge(e,t,s){var i=arguments.length===1?m(this._isDirected,arguments[0]):c(this._isDirected,e,t,s),r=this._edgeObjs[i];return r&&(e=r.v,t=r.w,delete this._edgeLabels[i],delete this._edgeObjs[i],C(this._preds[t],e),C(this._sucs[e],t),delete this._in[t][i],delete this._out[e][i],this._edgeCount--),this}inEdges(e,t){var s=this._in[e];if(s){var i=p(s);return t?g(i,function(r){return r.v===t}):i}}outEdges(e,t){var s=this._out[e];if(s){var i=p(s);return t?g(i,function(r){return r.w===t}):i}}nodeEdges(e,t){var s=this.inEdges(e,t);if(s)return s.concat(this.outEdges(e,t))}}L.prototype._nodeCount=0;L.prototype._edgeCount=0;function y(o,e){o[e]?o[e]++:o[e]=1}function C(o,e){--o[e]||delete o[e]}function c(o,e,t,s){var i=""+e,r=""+t;if(!o&&i>r){var n=i;i=r,r=n}return i+O+r+O+(l(s)?F:s)}function M(o,e,t,s){var i=""+e,r=""+t;if(!o&&i>r){var n=i;i=r,r=n}var h={v:i,w:r};return s&&(h.name=s),h}function m(o,e){return c(o,e.v,e.w,e.name)}export{L as G};
