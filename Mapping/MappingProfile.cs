using AutoMapper;
using vega.Controllers.Resources;
using vega.Models;

namespace vega.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            //mapping domain to resources
            CreateMap<Make,MakeResource>();
            CreateMap<Model,ModelResource>();
            CreateMap<Feature,FeatureResource>();
        }
    }
}