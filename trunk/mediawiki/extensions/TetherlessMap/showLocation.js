var showDiffPropLocMap=null;
var locationMarkers=null;
var properties=null;
var route=null;
var period=2;
var refreshLayer=null;
var refreshLayerURL=null;
var time=0;
var thisShuttleMarker;
 
//initialize map
function inimap(map)
{
	showDiffPropLocMap=map;
	locationMarkers=new Array();  
}

//tab control, content control, (switch content of a div between location list and semantic layer)
function tabon(id) {

    if (id==1) {
	  document.getElementById("property").className='tabon';
	  document.getElementById("checkform").className='dispon';
	  document.getElementById("location").className='taboff';
	  document.getElementById("locationList").className='dispoff';
    } else {
	  document.getElementById("location").className='tabon';
	  document.getElementById("locationList").className='dispon';
	  document.getElementById("property").className='taboff';
	  document.getElementById("checkform").className='dispoff';
    }
}

//function that will center at the location that been clicked, also trigger the marker infowindow
function centerAtMarker(markernum)
{
if(showDiffPropLocMap!=null)
{
  if(markernum<locationMarkers.length)
  {
	showDiffPropLocMap.setCenter(locationMarkers[markernum].lmarker.latlng_);
	GEvent.trigger(locationMarkers[markernum].lmarker,'click');
  }		
}

}
//put kml to checkbox property list, display kml on map
var j=0;
function parseLayer(kmlLayer)
{
if(kmlLayer!=null){
	var routeArray=kmlLayer.split(" ");
	var nameLink;
	for(var i=0;i<routeArray.length;i++)
	{
		nameLink=routeArray[i].split(";");
		var newRoute=new GGeoXml(nameLink[1]);
		showDiffPropLocMap.addOverlay(newRoute);
		addNewMarkers(newRoute,nameLink[0]);
		properties.push(nameLink[0]);
	}
}

}

var i=0;
//call by googleMapMultiObjects.php to import all markers
function addNewMarkers(marker,property)
{

	if(property=="")
	{
		property="Other";
	}
	var newMarker=new newTypeMarker(marker,property);
	locationMarkers.push(newMarker);
	i++;
	
}
//create an object of layer/marker with property
function newTypeMarker(marker,property)
{
	
	this.lmarker=marker;
	this.lproperty=property;
	this.onMap=true;
	this.supposeOnMap=true;
}

//parse properties, kml. and print checkboxes
function printForm(propertiesForm,kmlLayer)
{
	var output="<form name='showTypeLocation' id='showTypeLocation' method='POST'>\nCheck the type of location to be display on the map:<br />";
	
	properties=propertiesForm.split(";");
	properties.pop();
	
	if(kmlLayer!="")
	{
	parseLayer(kmlLayer);
	}
	properties.push("Other");
	var printedcheck=new Array();
	for(var i=0;i<properties.length;i++)
	{
		var property=properties[i];	
		var printing=true;
		for(var k=0;k<printedcheck.length;k++)
		{
			if(properties[i]==printedcheck[k])
			{
				printing=false;
				break;
			}
		}
		if(printing==true)
		{
		output+="<input type='checkbox' id='"+property+"'  name='"+property+"' value='"+property+"' checked='checked' onchange='showLocation() '/> \n"+property+"<br />";
		printedcheck.push(property);
		}
	}
	output+='<br /><input type="button" name="CheckAll" value="Display All" onClick="checkAll()">';
	output+=' <input type="button" name="UnCheckAll" value="Hide All" onClick="uncheckAll()">';
	output+="</form>";
	document.getElementById("numInst").innerHTML="Number Of Objects Displayed: "+locationMarkers.length+"<br />";
	document.getElementById("numInst").innerHTML="Number Of Objects Displayed: "+locationMarkers.length+"<br />";
	document.getElementById("cform").innerHTML=output;
}

/*
check or uncheck all checkboxes of properties and display new content on map
*/
function checkAll() 
{
	for (var i=0;i<properties.length;i++)
	{
		document.getElementById(properties[i]).checked=true;
	}
	showLocation();
}
function uncheckAll() 
{
	for (var i=0;i<properties.length;i++)
	{
		document.getElementById(properties[i]).checked=false;
	}

	showLocation();
}
//display locations with selected properties
function showLocation()
{

	//Assume all location shouldn't be on map
	var count=0;
	if(showDiffPropLocMap!=null)
	{	
		for(var k=0;k<locationMarkers.length;k++)
		{
			locationMarkers[k].supposeOnMap=false;
		}		
	}

	//add all location that should be on map
	for(var i=0;i<properties.length;i++)
	{
		if(document.getElementById(properties[i]).checked==true)
		{
			for(var j=0;j<locationMarkers.length;j++)
			{
				if((locationMarkers[j].lproperty).match(properties[i]))
				{
					if(!locationMarkers[j].onMap)
					{
					showDiffPropLocMap.addOverlay(locationMarkers[j].lmarker);
					locationMarkers[j].onMap=true;
					}
					locationMarkers[j].supposeOnMap=true;
					
				}
			}
		}
	}
	
	//remove all location that shouldn't be on map
	for(var j=0;j<locationMarkers.length;j++)
	{
		if(!locationMarkers[j].supposeOnMap)
		{
			if(locationMarkers[j].onMap){
			showDiffPropLocMap.removeOverlay(locationMarkers[j].lmarker);
			locationMarkers[j].onMap=false;
			}
			count++;
		}
	}
	document.getElementById('numInst').innerHTML="Number Of Instances Displayed: "+(locationMarkers.length-count);
}
/*
filter list of locations based on user input
*/
function queryList()
{
var output="";
for(var i=0;i<locationMarkers.length;i++)
{
if(String(locationMarkers[i].lmarker.title_).match(document.getElementById('search').value))
{
if(locationMarkers[i].lmarker.title_)
output+=(i+1)+" <a href='javascript:centerAtMarker("+i+")'>"+locationMarkers[i].lmarker.title_+"</a><br />";
}
}
document.getElementById("namelist").innerHTML=output;
}