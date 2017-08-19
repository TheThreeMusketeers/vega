using AutoMapper;
using vega.Controllers.Resources;
using vega.Models;
using System.Linq;
using System.Collections.Generic;

namespace vega.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            //mapping domain to API resources
            CreateMap<Make,MakeResource>();
            CreateMap<Model,ModelResource>();
            CreateMap<Feature,FeatureResource>();
            CreateMap<Vehicle,VehicleResource>()
                .ForMember(vr=>vr.Contact,opt=>opt.MapFrom(v=>new ContactResource {Name=v.ContactName,Email=v.ContactEmail,Phone=v.ContactPhone}))
                .ForMember(vr=>vr.Features,opt=>opt.MapFrom(v=>v.Features.Select(vf=>vf.FeatureId)));

            //mapping API resources to domain
            CreateMap<VehicleResource,Vehicle>()
                .ForMember(v=>v.Id,opt=>opt.Ignore())
                .ForMember(v=>v.ContactName,opt=>opt.MapFrom(vr=>vr.Contact.Name))
                .ForMember(v=>v.ContactEmail,opt=>opt.MapFrom(vr=>vr.Contact.Email))
                .ForMember(v=>v.ContactPhone,opt=>opt.MapFrom(vr=>vr.Contact.Phone))
                //.ForMember(v=>v.Features,opt=>opt.MapFrom(vr=>vr.Features.Select(id=>new VehicleFeature {FeatureId=id})));
                .ForMember(v=>v.Features,opt=>opt.Ignore())
                .AfterMap((vr,v)=>{
                    //Remove unselected features
                    /* 
                    var removedFeatures=new List<VehicleFeature>();
                    foreach(var f in v.Features)
                    {
                        if(!vr.Features.Contains(f.FeatureId))
                            removedFeatures.Add(f);
                    }
                    */

                    var removedFeatures = v.Features.Where(f=>!vr.Features.Contains(f.FeatureId));

                    foreach (var f in removedFeatures)
                    {
                        v.Features.Remove(f);
                    }

                    //add new features
                    /* 
                    foreach (var id in vr.Features)
                    {
                        if(!v.Features.Any(f=>f.FeatureId==id))
                            v.Features.Add(new VehicleFeature{FeatureId=id});
                    }
                    */

                    var addedFeatures = vr.Features.Where(id=>!v.Features.Any(f=>f.FeatureId==id));
                    foreach (var id in addedFeatures)
                    {
                        v.Features.Add(new VehicleFeature{FeatureId=id});
                    }
                });
        }
    }
}